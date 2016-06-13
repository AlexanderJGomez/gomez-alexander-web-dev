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
    app.put("/api/page/:pageId/widget", reorderWidget);

    function createWidget(req, res) {
        console.log("Inside server service")
        var newWidget = req.body;
        newWidget._page = req.params.pageId;
        console.log(newWidget);
        var newWidgetId;
        widgetModel.createWidget(newWidget)
            .then(function(widget) {
                newWidgetId = widget._id;
                return pageModel.addWidget(req.params.pageId, widget)
            },
            function(err) {
                res.status(404).send("Error creating widget");
                return;
            })


            .then(function(page) {
                return widgetModel.findAllWidgetsForPage(page._id);
            },
            function(err) {
                res.status(404).send("Error creating widget");
            }
            )
            
            .then(function(widgets) {
                newWidget.order = widgets.length - 1;
                return widgetModel.updateWidget(newWidgetId, newWidget);
            },
            function(err) {
                res.status(404).send("Error creating widget");
            })

            .then(function(widget) {
                res.json(widget);
            },
            function(err) {
                res.status(404).send("Error creating widget");
            });
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

    function reorderWidget(req, res) {
        console.log("In reorder widget and start is " + start + " and end is " + end)
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        console.log("In reorder widget and start is " + start + " and end is " + end)
        widgetModel.findAllWidgetsForPage(req.params.pageId)
            .then(function(widgets) {
                console.log(widgets);
                widgets.forEach(function(widget){
                    console.log("In for each");
                    if(start < end) {
                        if(widget.order > start && widget.order <= end) {
                            console.log("place " + widget.order + " becomes " + (widget.order - 1));
                            widget.order--;
                            widgetModel.updateWidget(widget._id, widget)
                                .then(function(widget) {

                                })
                        } else if(widget.order === start) {
                            console.log("place " + widget.order + " becomes " + end);
                            widget.order = end;
                            widgetModel.updateWidget(widget._id, widget)
                                .then(function(widget) {

                                })
                        }
                    }
                    else {
                        if(widget.order >= end && widget.order < start) {
                            console.log("place " + widget.order + " becomes " + (widget.order + 1));
                            widget.order++;
                            widgetModel.updateWidget(widget._id, widget)
                                .then(function(widget) {
                                })
                        } else if(widget.order === start) {
                            console.log("place " + widget.order + " becomes " + end);
                            widget.order = end;
                            widgetModel.updateWidget(widget._id, widget)
                                .then(function(widget) {
                                })
                        }
                    }
                });
            },
            function(err) {
                res.status(400).send("Error reordering widgets");
            })

        res.send({})
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
                    widgetModel.updateWidget(req.params.widgetId, widget)
                    .then(function(widget) {
                        res.json(widget);
                    },
                    function(err) {
                        res.status(404).send("COuld not update widget");
                    })
                break;
            case "HTML":
                widgetModel.updateWidget(req.params.widgetId, widget)
                    .then(function (widget) {
                        res.json(widget);
                    })
                break;
            case "TEXT":
                widgetModel.updateWidget(req.params.widgetId, widget)
                    .then(function (widget) {
                        res.json(widget);
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