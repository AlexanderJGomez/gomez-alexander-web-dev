/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);
    var bcrypt = require('bcrypt-nodejs')


    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addWebsite: addWebsite,
        findUserByFacebookId: findUserByFacebookId
    };
    
    return api;

    function findUserById(id) {
        return User.findById(id);
    }

    function createUser(user) {
        return User.create(user);
    }
    
    function findUserByUsername(username) {
        return User.find({username: username});
    }
    
    function findUserByCredentials(username, password) {
        var pass = bcrypt.hashSync(password);
        return User.find({username:username, password:pass});
    }

    function findUserByFacebookId(facebookId) {
        console.log(facebookId);
        return User.findOne({'facebook.id': facebookId});
    }
    
    function deleteUser(id) {
        //delete user._id;
        return User.findByIdAndRemove(id);
    }

    function addWebsite(id, websiteId) {
        return User.findByIdAndUpdate(id, {$push: {"websites": websiteId}},
            {safe: true, upsert: true, new : true});
    }

    
    function updateUser(id, newUser) {
        delete newUser._id;
        return User.findByIdAndUpdate(id, newUser);
    }
    
    
}