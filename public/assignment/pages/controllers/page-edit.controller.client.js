(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var vm = this;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;



        vm.updatePage = updatePage;
        vm.deletePage = deletePage;


        function init() {
            var promise = PageService.findAllPagesForWebsite(websiteId);
            promise.success(function (response){
                vm.pages = response;
            });

            var promise2 = PageService.findPageById(pageId);
            promise2.success(function (response) {
                    var page= response;
                    vm.page = page;
                }

            );

        }

        init();
        function updatePage(newPage) {
            PageService
                .updatePage(pageId, newPage)
                .success(function (page) {
                    if (page != null) {
                        vm.message = "Page Successfully Updated!"
                    } else {
                        vm.error = "Unable to update Page";
                    }
                });
        }

        function deletePage(page) {
            var answer = confirm("Are you sure?");
            if (answer) {
                PageService
                    .deletePage(pageId)
                    .success(function () {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/");
                    })
                    .error(function () {
                        vm.error = 'unable to remove Page';
                    });
            }
        }
    }
})();