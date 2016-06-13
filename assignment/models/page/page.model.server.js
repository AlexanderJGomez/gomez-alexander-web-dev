/**
 * Created by alexgomez on 6/10/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage,
        addWidget: addWidget
    };
    return api;

    function createPage(page) {
        return Page.create(page);
    }
    
    function addWidget(id, widgetId) {
        return Page.findByIdAndUpdate(id, {$push: {"widgets": widgetId}},
            {safe: true, upsert: true, new : true});
    }

    function deletePage(id) {
        return Page.findByIdAndRemove(id);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return Page.findByIdAndUpdate(pageId, page);
    }

    function findPageById(id) {
        return Page.findById(id);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

};