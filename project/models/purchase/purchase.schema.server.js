/**
 * Created by alexgomez on 6/23/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var PurchaseSchema = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        items: [{
            ref: "Item",
            type: mongoose.Schema.Types.ObjectId
        }],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.purchase"});
    return PurchaseSchema;
};