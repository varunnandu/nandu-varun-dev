
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        var pages = PageService.findPageByWebsiteId(websiteId);
        var page = PageService.findPageById(pageId);

        var vm = this;

        vm.pageId = pageId;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pages = pages;
        vm.page = page;
    }
})();