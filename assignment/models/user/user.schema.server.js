/**
 * Created by alexgomez on 6/6/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        dateUpdated: Date
    }, {collection: "assignment.user"})

    return UserSchema;
}