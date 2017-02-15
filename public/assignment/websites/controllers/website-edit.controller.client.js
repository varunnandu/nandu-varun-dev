(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findAllWebsites(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website = WebsiteService.findWebsiteById(websiteId);



        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
        }

        init();
        function updateWebsite(websiteId, newWebsite) {
            var website = WebsiteService.updateWebsite(websiteId, newWebsite);
            if (website != null) {
                vm.message = "Website Successfully Updated!"
            } else {
                vm.error = "Unable to update Website";
            }
        }

        function deleteWebsite(websiteId) {
            var site = WebsiteService.deleteWebsite(websiteId);
            if (site != null) {
                vm.delmessage = "Website Successfully Deleted"
            } else {
                vm.errmsg = "Unable to delete Website";
            }
        }
    }
})();