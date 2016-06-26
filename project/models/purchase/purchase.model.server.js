module.exports = function() {
    var mongoose = require("mongoose");

    var PurchaseSchema = require("./purchase.schema.server.js")();
    var Purchase = mongoose.model("Purchase", PurchaseSchema);

    var api = {
        findPurchasesForUser: findPurchasesForUser,
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