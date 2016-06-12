/**
 * Created by alexgomez on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Widget' },
        name : String,
        widgetType: String,
        text: String,
        size: Number,
        width: Number,
        url: String,
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};