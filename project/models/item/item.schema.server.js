/**
 * Created by alexgomez on 6/21/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var ItemSchema = mongoose.Schema({
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: Number,
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        image: String,
        dateAdded: {type: Date, default: Date.now}
    }, {collection: "project.item"});

    return ItemSchema;
};