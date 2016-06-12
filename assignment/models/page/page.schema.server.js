/**
 * Created by alexgomez on 6/10/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = mongoose.Schema({
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name : String,
        title : String,
        dateCreated : {type : Date, default: Date.now},
        widgets : [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}]
    }, {collection: "assignment.page"});

    return PageSchema;
};