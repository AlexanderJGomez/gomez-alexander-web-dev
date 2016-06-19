/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    //mongoose.createConnection("mongodb://localhost/cs4550summer1");
    var connectionString = 'mongodb://localhost/cs4550summer1';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
        //process.env.FACEBOOK_CALLBACK_URL = "http://webdev-alexandergomez.rhcloud.com:8080/auth/facebook/callback";
    }
 
    mongoose.createConnection(connectionString);
    
    
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