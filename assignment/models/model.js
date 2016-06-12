/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.createConnection("mongodb://localhost/cs4550summer1");
    
    
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    
    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel : widgetModel
    }
    return models;
    
    
    
};