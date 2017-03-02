/**
 * Created by Rohit on 28-Feb-17.
 */
module.exports=function(app){
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);

    var widgets = [
        {
            "_id": "123",
            "name": "Main Header",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "2",
            "text": "GIZMODO"
        },
        {
            "_id": "234",
            "name": "Paragraph Header",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "4",
            "text": "Lorem ipsum"
        },
        {
            "_id": "345", "name": "Illus. Image", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
        },
        {
            "_id": "456", "name": "Paragraph Text",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'
        },
        {
            "_id": "567",
            "name": "Image Caption",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": "4",
            "text": "Lorem ipsum"
        },
        {
            "_id": "678", "name": "Content Video", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/Kl5B6MBAntI"
        },
        {
            "_id": "789",
            "name": "Video Description",
            "widgetType": "HTML",
            "pageId": "321",
            "text": "<p>Lorem ipsum</p>"
        }
    ];

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
        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;
        var callbackUrl="/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        res.redirect(callbackUrl);
    }

    function getWidgetById(wid){
        return widgets.find(function(value){
            return value._id==wid;
        });
    }
    function createWidget(req,res){

        var pageId=req.params["pageId"];
        var widget=req.body;
        widget.pageId = pageId;
        widget._id = new Date().getTime().toString();
        widgets.push(widget);
        res.send(widget._id);
    }

    function findAllWidgetsForPage(req,res){

        var pageId=req.params["pageId"];
        var pageWidgets = [];
        for (var wg in widgets) {
            if (widgets[wg].pageId === pageId) {
                pageWidgets.push(widgets[wg]);
            }
        }
        res.send(pageWidgets);

    }

    function findWidgetById(req,res){

        var widgetId=req.params["widgetId"];
        for (var wg in widgets) {
            if (widgets[wg]._id === widgetId) {
                res.send(widgets[wg]);
                return;
            }
        }
        res.status(404).send("Unable to fetch widget data ="+widgetId);
        return;

    }

    function updateWidget(req,res){

        var widgetId=req.params["widgetId"];
        for (var wg in widgets) {
            var widget = widgets[wg];
            if (widget._id === widgetId) {

                var updatedWidget=req.body;
                widget.name=updatedWidget.name;
                widget.size = updatedWidget.size;
                widget.text = updatedWidget.text;
                widget.width = updatedWidget.width;
                widget.url = updatedWidget.url;
                res.send(widget);
                return;

            }
        }
        res.status(404).send("Unable to update widget with id="+widgetId);
        return;

    }

    function deleteWidget(req,res){

        var widgetId=req.params["widgetId"];
        for (var wg in widgets) {
            if (widgets[wg]._id === widgetId) {
                widgets.splice(wg, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to delete");
        return;

    }
}