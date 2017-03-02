/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "createWidgetFromType": createWidgetFromType
        };
        return api;

        function createWidget(pageId, widget) {

            return $http.post("/api/page/"+pageId+"/widget",widget);

        }

        function findWidgetsByPageId(pageID) {

            return $http.get("/api/page/"+pageID+"/widget");

        }

        function findWidgetById(widgetID) {

            return $http.get("/api/widget/"+widgetID);

        }

        function updateWidget(updatedWidget) {

            return $http.put("/api/widget/"+updatedWidget._id,updatedWidget);

        }

        function deleteWidget(widgetID) {

            return $http.delete("/api/widget/"+widgetID);
        }

        function createWidgetFromType(pageID, widgetType) {
            var widget = {
                "name": "Sample Widget",
                "size": "1",
                "text": "Sample Text",
                "url": "Sample URL",
                "width": "100%",
                "widgetType": widgetType.toUpperCase()
            };
            return createWidget(pageID, widget);
        }
    }
})();