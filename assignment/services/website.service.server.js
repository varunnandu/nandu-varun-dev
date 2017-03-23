module.exports = function (app, model) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.post('/api/user/:userId/website', createWebsite);

    var websiteModel = require('../../assignment/model/website/website.model.server');



    function findAllWebsitesForUser(req, res) {
       var userId = req.params.userId;
       websiteModel
           .findAllWebsitesForUser(userId)
           .then(
               function (status) {

                       res.json(status);
               },
               function (error) {
                   res.sendStatus(400).send(error);
               }
           );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (status) {

                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
       var websiteId = req.params.websiteId;
       websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function (website) {
                    model.userModel
                        .findUserById(userId)
                        .then(
                            function(user){
                                user.websites.push(website._id);
                                user.save();
                            }

                        )
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};