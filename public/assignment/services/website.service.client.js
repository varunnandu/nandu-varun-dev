(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api ={
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function updateWebsite(websiteId, newWebsite){
            return $http.put('/api/website/'+websiteId, newWebsite);
        }

        function deleteWebsite(websiteId){
            return $http.delete('/api/website/'+websiteId);
        }

        function findWebsiteById(websiteId) {
            return $http.get('/api/website/'+websiteId);
        }
        function createWebsite(userId, newWebsite){
            return $http.post('/api/user/'+userId+'/website', newWebsite);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get('/api/user/'+userId+'/website');
        }
    }
})();