/**
 * Created by alexgomez on 6/3/16.
 */


module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/page/:pageId/widget", createWidget);
    app.get ("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get ("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget.pageId = req.params.pageId;
        widgets.push(newWidget);
        res.json(newWidget);
        console.log(newWidget)
    }
    
    function findAllWidgetsForPage(req, res) {
        var w = [];
        var pageId = req.params.pageId;
        for(var i in widgets) {
            if(pageId === widgets[i].pageId) {
                w.push(widgets[i]);
            }
        }
        res.send(w);
        return;
    }

    function updateWidget(req, res) {
        var widget = req.body;

        switch(widget.widgetType) {
            case "HEADER":
                if(!(widget.name && widget.size && widget.text)) {
                    res.status(404).send("Could not update widget")
                    return;
                }
                break;
            case "YOUTUBE":
                if(!(widget.name && widget.width && widget.url)) {
                    res.status(404).send("Could not update widget")
                    return;                }
                break;
            case "IMAGE":
                if(!(widget.name && widget.width && widget.url)) {
                    res.status(404).send("Could not update widget")
                    return;                }
                break;
            default:
                break;
        }

        for(var i in widgets) {
            if(widgets[i]._id === req.params.widgetId) {
                widgets[i].size = widget.size;
                widgets[i].text = widget.text;
                widgets[i].width = widget.width;
                widgets[i].url = widget.url;
                widgets[i].name = widget.name;
                res.send(widgets[i])
                return;
            }
        }

        res.send(null);
        return;
    }
    
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id == widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).send("Widget not found");
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
                console.log("IN HERE")
            }
        }

        res.redirect("/assignment/#/user/"+req.body.userId+"/website/"+req.body.websiteId+"/page/"+req.body.pageId+
            "/widget/" + widgetId);
    }
}