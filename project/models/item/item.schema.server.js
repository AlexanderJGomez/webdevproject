/**
 * Created by alexgomez on 6/21/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var mts = require("mongoose-text-search");

    var ItemSchema = mongoose.Schema({
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: Number,
        category: {
            type: String,
            enum: ["Tops", "Bottoms", "Footwear", "Outerwear"]
        },
        purchased: {
            type: Boolean,
            default: null},
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        image: String,
        dateAdded: {type: Date, default: Date.now}
    }, {collection: "project.item"});
    ItemSchema.plugin(mts);
    ItemSchema.index({ name: 'text', description: 'text'}, {name: 'My text index', weights: {name: 3, description: 1}});
    return ItemSchema;
};