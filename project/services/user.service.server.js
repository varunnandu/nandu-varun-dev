module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user/Admin", findAdminUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var userModel = require('../../project/model/user/user.model.server');

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);

        userModel
            .createUser(newUser)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(
                function (status) {

                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(
                function (status) {
                    if(status.length == 0){
                       res.sendStatus(400);
                    }
                    else
                    {
                        res.json(status[0]);

                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAdminUser(req, res) {
        var type = req.query['kindof'];
        userModel
            .findAdminUser(type)
            .then(
                function (status) {
                    if(status.length == 0){
                        res.send(400);
                    }
                    else
                    {
                        res.json(status[0]);

                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        var kindof = req.query['kindof'];
        userModel
            .findUserByCredentials(username, password, kindof)
            .then(
                function (status) {
                    if(status.length == 0){
                        res.sendStatus(400);
                    }
                    else
                    {
                        res.json(status[0]);

                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};
