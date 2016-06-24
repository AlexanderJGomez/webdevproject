/**
 * Created by alexgomez on 6/23/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var PurchaseSchema = require("./purchase.schema.server.js")();
    var Purchase = mongoose.model("Purchase", PurchaseSchema);

    var api = {
        findPurchaseForUser: findPurchaseForUser,
        createPurchase: createPurchase
    };
    return api;

    function findPurchasesForUser(id) {
        return Purchase.find({user: id});
    }

    function createPurchase(userId, items) {
        return Purchase.create({user: userId, items: items})
    }
}