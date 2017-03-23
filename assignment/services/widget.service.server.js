
module.exports=function(app, model){
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    app.put("/api/page/:pageId/widget",updateWidgetIndex);




    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function (widgetData) {
                widgetData.url = '/uploads/'+filename;
                widgetData.save();
                var callbackUrl="/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                res.redirect(callbackUrl);
            },function (error) {
                res.sendStatus(404);
                return;
            });
    }

    function getWidgetById(wid){
        model.widgetModel
            .findWidgetById(wid)
            .then(function (widgetData) {
                res.send(widgetData);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });
    }
    function createWidget(req,res){

        var pageId=req.params["pageId"];
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                var widget=req.body;
                widget.index=widgets.length+1;
                model.widgetModel
                    .createWidget(pageId,widget)
                    .then(function (widget) {
                        // console.log("widget._id"+widget._id);
                        res.send(widget);
                        return;
                    },function (error) {
                        res.sendStatus(404);
                        return;
                    });
            },function (error) {
                res.sendStatus(404);
                return;
            });


    }

    function findAllWidgetsForPage(req,res){

        var pageId=req.params["pageId"];
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });


    }

    function findWidgetById(req,res){

        var widgetId=req.params["widgetId"];
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });


    }

    function updateWidget(req,res){

        var widgetId=req.params["widgetId"];
        var updatedWidget=req.body;
        model.widgetModel
            .updateWidget(widgetId,updatedWidget)
            .then(function (widget) {
                res.send(widget);
                return;
            },function (error) {
                res.status(404).send("Unable to update widget with id="+widgetId);
                return;
            });


    }

    function deleteWidget(req,res){

        var widgetId=req.params["widgetId"];
        model.widgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                res.sendStatus(200);
                return;
            },function (error) {
                res.sendStatus(404);
                return;
            });


    }

    function updateWidgetIndex(req,res) {
        var pageId=req.params["pageId"];
        var start=req.body.start+1;
        var stop=req.body.stop+1;
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                console.log(widgets);
                if(start<stop){
                    for (var wg in widgets){
                        if(widgets[wg].index===start){
                            widgets[wg].index=stop;
                            widgets[wg].save();
                        }
                        else if(widgets[wg].index>start && widgets[wg].index<=stop){
                            widgets[wg].index-=1;
                            widgets[wg].save();
                        }
                    }
                }
                if(start>stop){
                    for (var wg in widgets){
                        if(widgets[wg].index===start){
                            widgets[wg].index=stop;
                            widgets[wg].save();
                        }
                        else if(widgets[wg].index<start && widgets[wg].index>=stop){
                            widgets[wg].index+=1;
                            widgets[wg].save();
                        }
                    }
                }
                console.log(widgets);
            },function (error) {
                res.sendStatus(404);
                return;
            });
        

    }
};