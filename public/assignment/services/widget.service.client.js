(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "createWidget": createWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var widget = [];
            for(var w in widgets) {
                if(pageId === widgets[w].pageId) {
                    widget.push(widgets[w]);
                }


            }
            return widget;
        }

        function createWidget(pageId, newWidget){
            var wg = {
                "__id": 612,
                "widgetType": newWidget.widgetType,
                "size": newWidget.size,
                "text": newWidget.text,
                "url": newWidget.url,
                "pageId": pageId

            }
            return widgets.push(wg);
        }
        function deleteWidget(widgetId){
            for(var w in widgets) {
                if( widgets[w]._id == widgetId ) {
                    widgets.splice(w, 1);
                }
            }
            return null;
        }
        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgetId === widgets[w]._id) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }
        function updateWidget(widgetId, newWidget){
            for(var w in widgets) {
                if( widgets[w]._id == widgetId
                        && newWidget.widgetType == "HEADING") {
                    widgets[w].name = newWidget.name;
                    widgets[w].text = newWidget.text;
                    return widgets[w];
                }
                else if( widgets[w]._id == widgetId
                    && newWidget.widgetType == "IMAGE") {
                    widgets[w].name = newWidget.name;
                    widgets[w].url = newWidget.url;
                    return widgets[w];
                }
                else if( widgets[w]._id == widgetId
                    && newWidget.widgetType == "HTML") {
                    widgets[w].name = newWidget.name;
                    widgets[w].text = newWidget.text;
                    return widgets[w];
                }
                else if( widgets[w]._id == widgetId
                    && newWidget.widgetType == "YOUTUBE") {
                    widgets[w].name = newWidget.name;
                    widgets[w].url = newWidget.url;
                    return widgets[w];
                }
            }
            return null;
        }

    }
})();