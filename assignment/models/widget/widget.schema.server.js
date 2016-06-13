/**
 * Created by alexgomez on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Widget' },
        name : String,
        widgetType: {
            type: String,
            enum: ['HEADER', 'YOUTUBE', 'HTML', 'IMAGE', 'INPUT', 'HEADER', "TEXT"]
        },
        text: String,
        placeholder: String,
        description: String,
        size: Number,
        width: Number,
        height: String,
        rows: Number,
        class: String,
        icon: String,
        order: Number,
        deletable: Boolean,
        formatted: Boolean,
        url: String,
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};