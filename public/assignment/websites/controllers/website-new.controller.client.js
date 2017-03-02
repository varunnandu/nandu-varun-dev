(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websitenewController);

    function websitenewController($routeParams, $location, WebsiteService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;
        vm.userId = userId;

        // event handlers
        vm.addWebsite = addWebsite;
        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(userId);
            promise.success(function (response) {
                var websites = response;
                vm.websites = websites;
            });
        }

        init();

        function addWebsite(website) {
            WebsiteService
                .createWebsite(userId, website)
                .success(function (response) {

                    $location.url('/user/'+userId+'/website/');
                })
                .error(function () {
                    vm.error = 'sorry could not register';
                });
        }
    }
})();