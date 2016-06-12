/**
 * Created by alexgomez on 6/3/16.
 */


module.exports = function (app, models) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;


    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/page/:pageId/widget", createWidget);
    app.get ("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get ("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget._page = req.params.pageId;
        widgetModel.createWidget(newWidget)
            .then(function(widget) {
                pageModel.addWidget(req.params.pageId, widget)
                    .then(function(page) {
                        res.json(widget);
                    })
            },
            function(err) {
                res.status(404).send("Error creating widget");
            })
    }
    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function(widgets) {
                res.send(widgets);
            },
            function(err) {
                res.status(404).send("Error finding widgets")
            })
    }

    function deleteWidget(req, res) {
        widgetModel.deleteWidget(req.params.widgetId)
            .then(function(widget) {
                res.json(widget);
            },
            function(err) {
                res.status(404).send("Could not delete widget");
            })
    }

    function updateWidget(req, res) {
        var widget = req.body;
        console.log(widget);

        switch(widget.widgetType) {
            case "HEADER":
                if(!(widget.name && widget.size && widget.text)) {
                    res.send(null)
                    return;
                }
                else {
                    widgetModel.updateWidget(req.params.widgetId, widget)
                .then(function(widget) {
                            res.json(widget);
                        },
                        function(err) {
                            res.status(404).send("COuld not update widget");
                        })
                }
                break;
            case "YOUTUBE":
                if(!(widget.name && widget.width && widget.url)) {
                    res.send(null)
                    return;
                }
                else {
                    widgetModel.updateWidget(req.params.widgetId, widget)
                .then(function(widget) {
                            res.json(widget);
                        },
                        function(err) {
                            res.status(404).send("COuld not update widget");
                        })
                }
                break;
            case "IMAGE":
                    console.log("In services");
                    widgetModel.updateWidget(req.params.widgetId, widget)
                    .then(function(widget) {
                        res.json(widget);
                    },
                    function(err) {
                        res.status(404).send("COuld not update widget");
                    })
                break;
            default:
                break;
        }
    }
    
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(function(widget) {
                res.json(widget);
            },
            function(err) {
                res.status(404).send("Could not find widget");
            })
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var newWidget = {};

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        newWidget.url = "/uploads/"+filename;
        
        widgetModel.updateWidget(widgetId, newWidget)
            .then(function(widget) {
                    res.redirect("/assignment/#/user/"+req.body.userId+"/website/"+req.body.websiteId+"/page/"+req.body.pageId+
                        "/widget/" + widgetId);
            },
            function(err) {
                res.status(404).send("Error updating widget");
            })
    }
}