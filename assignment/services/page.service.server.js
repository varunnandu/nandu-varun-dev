module.exports = function (app, model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);

    var pageModel = require('../../assignment/model/page/page.model.server');



    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (status) {

                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (status) {

                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        pageModel
            .updatePage(pageId, newPage)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.json(status[0]);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    model.websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function(website){
                                website.pages.push(page._id);
                                website.save();
                            }

                        )
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};