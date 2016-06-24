module.exports = function() {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        firstName: String,
        lastName: String,
        google: {
        },
        email: String,
        cart: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};