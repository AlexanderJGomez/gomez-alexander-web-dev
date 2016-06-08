/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.createConnection("mongodb://localhost/cs4550summer1");
    
    
    var userModel = require("./user/user.model.server.js")();
    var websiteModel;
    var pageModel;
    var widgetModel;
    
    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel : widgetModel
    }
    return models;
    
    
    
};