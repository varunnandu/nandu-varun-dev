(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websitenewController);

    function websitenewController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findAllWebsites(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website = WebsiteService.findWebsiteById(websiteId);


        // event handlers
        vm.addWebsite = addWebsite;
        function init() {
        }
        init();

        function addWebsite(websites, userId) {
            var site = WebsiteService.createWebsite(userId, websites);
            if(site != null) {
                vm.message = "Website Successfully Added!"
            } else {
                vm.error = "Unable to add Website";
            }
        }
    }
})();