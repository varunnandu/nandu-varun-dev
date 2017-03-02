module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        var webpages = [];
        for(var p in pages) {
            if(websiteId == pages[p].websiteId) {
                webpages.push(pages[p]);
            }
        }
        res.json(webpages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;


        for(var p in pages) {
            if(pageId === pages[p]._id) {
                res.send(pages[p]);
                return;
            }
        }
        res.send(404);
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        for(var p in pages) {
            var page = pages[p];
            if( page._id == pageId ) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.send(page);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var newPage = req.body;
        newPage._id = (new Date()).getTime() + "";
        newPage.websiteId = req.params['websiteId'];
        pages.push(newPage);

        res.send(newPage);
    }
};