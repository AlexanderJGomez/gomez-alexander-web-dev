/**
 * Created by alexgomez on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget
    };
    return api;

    function createWidget(widget) {
        return Widget.create(widget);
    }

    function deleteWidget(id) {
        return Widget.findByIdAndRemove(id);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.findByIdAndUpdate(widgetId, widget);
    }

    function findWidgetById(id) {
        return Widget.findById(id);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }
    

};