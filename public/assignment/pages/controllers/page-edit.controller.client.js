(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var vm = this;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;
        vm.pages = PageService.findPageByWebsiteId(websiteId);
        vm.page = PageService.findPageById(pageId);


        vm.updatePage = updatePage;
        vm.deletePage = deletePage;


        function init() {
        }

        init();
        function updatePage(pageId, newPage) {
            var page = PageService.updatePage(pageId, newPage);
            if (page != null) {
                vm.message = "Page Successfully Updated!"
            } else {
                vm.error = "Unable to update Page";
            }
        }

        function deletePage(pageId) {
            var page = PageService.deletePage(pageId);
            if (page != null) {
                vm.delmessage = "Page Successfully Deleted"
            } else {
                vm.errmsg = "Unable to delete Page";
            }
        }
    }
})();