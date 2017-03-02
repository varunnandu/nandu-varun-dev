(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PagenewController);

    function PagenewController($routeParams, $location, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;
        vm.userId = userId;

        // event handlers
        vm.addPage = addPage;
        function init() {
            var promise = PageService.findAllPagesForWebsite(websiteId);
            promise.success(function (response) {
                var pages = response;
                vm.pages = pages;
            });
        }

        init();

        function addPage(page) {
            PageService
                .createPage(websiteId, page)
                .success(function (response) {

                    $location.url('/user/'+userId+'/website/'+websiteId+'/page/');
                })
                .error(function () {
                    vm.error = 'sorry could not register';
                });
        }
    }
})();