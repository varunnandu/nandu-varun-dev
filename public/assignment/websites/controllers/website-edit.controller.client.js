(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;
        vm.userId = userId;
        vm.websiteId = websiteId;



        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(userId);
            promise.success(function (response){
                vm.websites = response;
                });

            var promise2 = WebsiteService.findWebsiteById(websiteId);
            promise2.success(function (response) {
                    var website= response;
                    vm.website = website;
                }

            );

        }

        init();
        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(websiteId, newWebsite)
                .success(function (website) {
                    if (website != null) {
                        vm.message = "Website Successfully Updated!"
                    } else {
                        vm.error = "Unable to update Website";
                    }
                });
        }

        function deleteWebsite(website) {
            var answer = confirm("Are you sure?");
            if (answer) {
                WebsiteService
                    .deleteWebsite(websiteId)
                    .success(function () {
                        $location.url("/user/"+userId+"/website/");
                    })
                    .error(function () {
                        vm.error = 'unable to remove Website';
                    });
            }
        }
    }
})();