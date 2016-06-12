/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);


    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addWebsite: addWebsite
    };
    
    return api;

    function findUserById(id) {
        return User.findById(id);
    }

    function createUser(user) {
        return User.create(user);
    }
    
    function findUserByUsername() {
        
    }
    
    function findUserByCredentials(username, password) {
        return User.find({username:username, password:password});
    }
    
    function deleteUser(id) {
        return User.findByIdAndRemove(id);
    }

    function addWebsite(id, websiteId) {
        return User.findByIdAndUpdate(id, {$push: {"websites": websiteId}},
            {safe: true, upsert: true, new : true});
    }

    
    function updateUser(id, newUser) {
        return User.findByIdAndUpdate(id, newUser);
    }
    
    
}