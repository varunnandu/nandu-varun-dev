
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.addWidget = addWidget;



        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();



        function updateWidget(widgetId, newWidget) {
            var widget = WidgetService.updateWidget(widgetId, newWidget);
            if (widget != null) {
                vm.message = "Page Successfully Updated!"
            } else {
                vm.error = "Unable to update Page";
            }
        }

        function deleteWidget(widgetId) {
            var widgt = WidgetService.deleteWidget(widgetId);
            if (widgt != null) {
                vm.delmessage = "Page Successfully Deleted"
            } else {
                vm.errmsg = "Unable to delete Page";
            }
        }

        function addWidget(pageId, widgets) {
            var widget = WidgetService.createWidget(pageId, widgets);
            if(widget != null) {
                vm.message = "Page Successfully Added!"
            } else {
                vm.error = "Unable to add Page";
            }
        }

        function getEditorTemplateUrl(type) {
            return 'widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }
    }
})();