(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        // TODO: complete website crud functions
        var api ={
            "findAllWebsites": findAllWebsites,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function updateWebsite(websiteId, newWebsite){
            for(var w in websites) {
                if( websites[w]._id == websiteId ) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                    return websites[w];
                }
            }
            return null;
        }

        function deleteWebsite(websiteId){
            for(var w in websites) {
                if( websites[w]._id == websiteId ) {
                    websites.splice(w, 1);
                }
            }
            return null;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
        function createWebsite(userId, newWebsite){
            var site = {
                "__id": 789,
                "name": newWebsite.name,
                "description": newWebsite.description,
                "developerId": userId

            }
            return websites.push(site);
        }

        function findAllWebsites(userId) {
            var sites = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
    }
})();