
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.userId = userId;
        vm.websiteId = websiteId;

        function init() {
            PageService
                .findAllPagesForWebsite(websiteId)
                .success(function(response){
                    vm.pages = response;
                });
        }
        init();
    }
})();