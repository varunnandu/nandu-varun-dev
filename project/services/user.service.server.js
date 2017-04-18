"use strict";

module.exports = function (app, userModel, movieModel, security) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../../uploads'});

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:userId/movie/:movieId/like", likeMovie);
    app.put("/api/project/user/:userId/movie/:movieId/undolike", undoLikeMovie);
    app.get("/api/project/user/:userId/movie/:movieId/ismovieliked", isMovieLiked);
    app.put("/api/project/user/:loggedInUserId/follows/:navigateUserId", follow);
    app.put("/api/project/user/:loggedInUserId/unfollows/:navigateUserId", unfollow);
    app.get("/api/project/user/:loggedInUserId/isalreadyfollowing/:navigateUserId", isAlreadyFollowing);
    app.get("/api/project/user/:userId/following", findAllFollowingUsers);
    app.get("/api/project/user/:userId/followers", findAllFollowersUsers);
    app.get("/api/project/user/:userId/likes", findAllLikedMovies);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/logout", logout);
    app.post("/api/project/user/:id", upload.single('profileImg'), updateUserWithImage);
    app.post("/api/project/login", login);
    app.get("/api/project/admin/user", findAllUsersAdmin);
    app.post("/api/project/admin/user", createUserAdmin);
    app.delete('/api/project/admin/user/:userId', deleteUserAdmin);
    app.put('/api/project/admin/user/:userId', updateUserAdmin);

    function updateUserAdmin(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }

        userModel
            .updateUser(req.params.userId, newUser)
            .then(
                function (user) {
                    return userModel.findAllUsers();
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
            userModel
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
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
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
            userModel
                .deleteUserById(req.params.userId)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
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
        res.json(user);
    }

    function createUser(req, res) {
        var reqUser = req.body;
        userModel
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

    function findUserByUsername(res, reqUsername) {
        userModel
            .findUserByUsername(reqUsername)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res, credentials) {
        userModel
            .findUserByCredentials(credentials)
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
            var credentials = {
                "username": reqUsername,
                "password": reqPassword
            };
            findUserByCredentials(req, res, credentials);
        }
        else if (reqUsername) {
            findUserByUsername(res, reqUsername);
        }
        else {
            findAllUsers(res);
        }
    }

    function findAllUsers(res) {
        userModel
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
        userModel
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
        userModel
            .updateUser(reqUserId, reqUser)
            .then(
                function (user) {
                    return userModel.findUserByUsername(reqUser.username);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
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
        userModel
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
        userModel
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
        userModel
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
        userModel
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

    function follow(req, res) {
        var loggedInUserId = req.params.loggedInUserId;
        var navigateUserId = req.params.navigateUserId;
        userModel
            .following(loggedInUserId, navigateUserId)
            .then(
                function (response) {
                    return userModel.followers(navigateUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unfollow(req, res) {
        var loggedInUserId = req.params.loggedInUserId;
        var navigateUserId = req.params.navigateUserId;
        userModel
            .removeFollowing(loggedInUserId, navigateUserId)
            .then(
                function (response) {
                    return userModel.removeFollowers(navigateUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function isAlreadyFollowing(req, res) {
        var loggedInUserId = req.params.loggedInUserId;
        var navigateUserId = req.params.navigateUserId;
        userModel
            .isAlreadyFollowing(loggedInUserId, navigateUserId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllFollowingUsers(req, res) {
        var reqUserId = req.params.userId;
        userModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return userModel.findAllFollowingUsers(user.following);
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

    function findAllFollowersUsers(req, res) {
        var reqUserId = req.params.userId;
        userModel
            .findUserById(reqUserId)
            .then(
                function (user) {
                    return userModel.findAllFollowersUsers(user.followers);
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

    function findAllLikedMovies(req, res) {
        var reqUserId = req.params.userId;
        userModel
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
        res.send(req.isAuthenticated() && req.user.type == "project" ? req.user : null);
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

        userModel.updateUser(userId, user)
            .then(function (response) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.redirect(req.header('Referer') + "#/profile/" + userId + "/edit-profile");
            }, function (err) {
                res.status(400).send(err);
            });
    }
}