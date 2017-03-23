
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update=updateWidget;
        vm.delete=deleteWidget;
        vm.create=createWidget;

        function createWidget(widgetType){
            var promise=WidgetService.createWidgetFromType(vm.pageId,widgetType);
            promise.then(function(response){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+response.data._id);
            },function(error){
                vm.error="Unable to create a widget";
            });
            // promise.success(function(response){
            //     console.log("ghdhgf="+response);
            //     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+response);
            // });
            // promise.error(function(){
            //     vm.error="Unable to create a widget";
            // });
        }

        function deleteWidget() {
            var promise=WidgetService.deleteWidget(vm.widgetId);
            promise.success(function(response){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });
            promise.error(function(){
                vm.error="Unable to delete widget";
            });

        }

        function updateWidget(newWidget){
            newWidget.size=parseInt(newWidget.size);
            var promise=WidgetService.updateWidget(newWidget);
            promise.success(function(response){
                vm.message="Widget successfully updated";
            });
            promise.error(function(){
                vm.error="Unable to update widget";
            });

        }

        function init() {
            if(vm.widgetId){
                var promise=WidgetService.findWidgetById(vm.widgetId);
                promise.success(function(response){
                    vm.widget =response;
                });
                promise.error(function(){
                    vm.error="Unable to find widget by id";
                });
            }
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }
    }
})();