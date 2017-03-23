
module.exports=function () {
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget:reorderWidget
    };
    var q = require('q');
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    return api;

    function createWidget(pageId, widget){
        var defer=q.defer();
        widget._page=pageId;
        WidgetModel
            .create(widget,function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }

    function findAllWidgetsForPage(pageId){
        var defer=q.defer();
        WidgetModel
            .find({_page:pageId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }

    function findWidgetById(widgetId){
        var defer=q.defer();
        WidgetModel
            .findOne({_id:widgetId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }

    function updateWidget(widgetId, widget){
        var defer=q.defer();
        WidgetModel
            .update({_id:widgetId},{$set:widget},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }

    function deleteWidget(widgetId){
        var defer=q.defer();
        WidgetModel
            .remove({_id:widgetId},function (err,data) {
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        return defer.promise;
    }

    function reorderWidget(pageId, start, end){

    }

};