/**
 * Created by alexgomez on 6/10/16.
 */
var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPage: addPage
    };
    return api;

    function createWebsite(userId, website) {
        website._user = userId;

        return Website.create(website);
    }

    function addPage(id, pageId) {
        return Website.findByIdAndUpdate(id, {$push: {"pages": pageId}},
            {safe: true, upsert: true, new : true});
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function deleteWebsite(id) {
        return Website.findByIdAndRemove(id);
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(id, website) {
        return Website.update({_id: id}, {$set: website});
    }

};