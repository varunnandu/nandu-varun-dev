(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PagenewController);

    function PagenewController($routeParams, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var page = PageService.findPageById(pageId);
        var vm = this;
        vm.pages = pages;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.websiteId = websiteId;
        vm.page = page;


        // event handlers
        vm.addPage = addPage;
        function init() {
        }
        init();

        function addPage(websiteId, pages) {
            var page = PageService.createPage(websiteId, pages);
            if(page != null) {
                vm.message = "Page Successfully Added!"
            } else {
                vm.error = "Unable to add Page";
            }
        }
    }
})();