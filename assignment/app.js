module.exports = function(app) {

    var models = require("./models/model.js")();

    var userService = require("./services/user.services.server.js")(app, models);
    var widgetService = require("./services/widget.services.server.js")(app, models);
    var websiteService = require("./services/website.services.server.js")(app, models);
    var pageService = require("./services/page.services.server.js")(app, models);


};