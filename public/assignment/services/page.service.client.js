(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        // TODO: complete website crud functions
        var api ={
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function updatePage(pageId, newPage){
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageId){
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    pages.splice(p, 1);
                }
            }
            return null;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function findPageByWebsiteId(websiteId) {
            var pgs = [];
            for(var p in pages) {
                if(websiteId === pages[p].websiteId) {
                    pgs.push(pages[p]);
                }


            }
            return pgs;
        }
        function createPage(websiteId, newPage){
            var pg = {
                "__id": 678,
                "name": newPage.name,
                "description": newPage.description,
                "websiteId": websiteId

            }
            return pages.push(pg);
        }
    }
})();