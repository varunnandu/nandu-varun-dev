
module.exports = function (app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var auth = authorized;
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/home',
            failureRedirect: '/project/index.html#/login'
        }));
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:userId/movie/:movieId/like", likeMovie);
    app.put("/api/project/user/:userId/movie/:movieId/undolike", undoLikeMovie);
    app.get("/api/project/user/:userId/movie/:movieId/ismovieliked", isMovieLiked);
    app.get("/api/project/user/:userId/likes", findAllLikedMovies);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/logout", logout);
    app.post("/api/project/user/:id", upload.single('myFile'), updateUserWithImage);
    app.post("/api/project/login", passport.authenticate('project'), login);
    app.get("/api/project/admin/user", findAllUsersAdmin);
    app.post("/api/project/admin/user", createUserAdmin);
    app.delete('/api/project/admin/user/:userId', deleteUserAdmin);
    app.put('/api/project/admin/user/:userId', updateUserAdmin);

    var projectUserModel = require('../../project/models/user.model.server');
    var movieModel = require('../models/movie.model.server');
    var reviewModel = require('../models/review.model.server');


    passport.use('project', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        projectUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    function facebookStrategy(token, refreshToken, profile, done) {
        projectUserModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return projectUserModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    function localStrategy(username, password, done) {
        projectUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {

                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function updateUserAdmin(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }

        projectUserModel
            .updateUser(req.params.userId, newUser)
            .then(
                function (user) {
                    return projectUserModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsersAdmin(req, res) {
        if (isAdmin(req.user)) {
            projectUserModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function createUserAdmin(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user == null) {
                        return projectUserModel.createUser(newUser)
                            .then(
                                function () {
                                    return projectUserModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return projectUserModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserAdmin(req, res) {
        if (isAdmin(req.user)) {
            projectUserModel
                .deleteUserById(req.params.userId)
                .then(
                    function (user) {
                        return projectUserModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        projectUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    res.json(user);
                },
                 function (err) {
                     res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var reqUser = req.body;
        reqUser.password = bcrypt.hashSync(reqUser.password);

        projectUserModel
            .createUser(reqUser)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(res, req) {
        projectUserModel
            .findUserByUsername(req)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;
        projectUserModel
            .findUserByCredentials(reqUsername, reqPassword)
            .then(
                function (user) {
                    if (user) {
                        req.session.currentUser = user;
                    }
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        var reqUsername = req.query.username;
        var reqPassword = req.query.password;

        if (reqUsername != null && reqPassword != null) {
            findUserByCredentials(req, res);
        }
        else if (reqUsername) {
            findUserByUsername(res, reqUsername);
        }
        else {
            findAllUsers(res);
        }
    }

    function findAllUsers(res) {
        projectUserModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findUserById(req, res) {
        var userId = req.params.id;
        projectUserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var reqUserId = req.params.id;
        var reqUser = req.body;
        projectUserModel
            .updateUser(reqUserId, reqUser)
            .then(
                function (user) {
                    if (user) {
                        req.session.currentUser = user;
                    }
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        projectUserModel
            .deleteUserById(userId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function likeMovie(req, res) {
        var reqMovieId = req.params.movieId;
        var reqUserId = req.params.userId;
        projectUserModel
            .likeMovie(reqUserId, reqMovieId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function undoLikeMovie(req, res) {
        var reqMovieId = req.params.movieId;
        var reqUserId = req.params.userId;
        projectUserModel
            .undoLikeMovie(reqUserId, reqMovieId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isMovieLiked(req, res) {
        var reqMovieId = req.params.movieId;
        var reqUserId = req.params.userId;
        projectUserModel
            .isMovieLiked(reqUserId, reqMovieId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findAllLikedMovies(req, res) {
        var reqUserId = req.params.userId;
        projectUserModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return movieModel.findAllLikedMovies(user.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function updateUserWithImage(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var imageFile = req.file;

        if (imageFile) {
            var destination = imageFile.destination;
            var path = imageFile.path;
            var originalname = imageFile.originalname;
            var size = imageFile.size;
            var mimetype = imageFile.mimetype;
            var filename = imageFile.filename;
            user.imgUrl = "/uploads/" + filename;
        }

        projectUserModel.updateUser(userId, user)
            .then(function (response) {
                    return projectUserModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.redirect(req.header('Referer') + "#/user/" + userId);
            }, function (err) {
                res.status(400).send(err);
            });
    }
};
