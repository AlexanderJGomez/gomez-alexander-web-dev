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
        facebook: {
            id: String,
            displayName: String
        },
        // google: {
        //
        // },
        phone: Number,
        websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }]
    }, {collection: "assignment.user"})

    return UserSchema;
}