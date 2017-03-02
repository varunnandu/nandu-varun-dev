(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        // TODO: complete website crud functions
        var api ={
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;


        function updatePage(pageId, newPage){
            return $http.put('/api/page/'+pageId, newPage);
        }

        function deletePage(pageId){
            return $http.delete('/api/page/'+pageId);
        }

        function findPageById(pageId) {
            return $http.get('/api/page/'+pageId);
        }
        function createPage(websiteId, newPage){
            return $http.post('/api/website/'+websiteId+'/page', newPage);
        }

        function findAllPagesForWebsite(websiteId) {
            return $http.get('/api/website/'+websiteId+'/page');
        }
    }
})();