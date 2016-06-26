module.exports = function() {

    var mongoose = require("mongoose");

    var ItemSchema = require("./item.schema.server.js")();
    var Item = mongoose.model("Item", ItemSchema);

    var api = {
        createItem: createItem,
        findItemsBySeller: findItemsBySeller,
        findItemById: findItemById,
        updateItem: updateItem,
        deleteItem: deleteItem,
        search: search,
        getItems: getItems,
        purchaseItems: purchaseItems
    };

    return api;

    function findItemById(id) {
        return Item.findById(id);
    }

    function findItemsBySeller(id) {
        return Item.find({seller: id});
    }

    function purchaseItems(cartIds) {
        return Item.update({'_id': { $in: cartIds}}, {purchased: true}, {multi: true});
    }

    function getItems() {
        return Item.find({}).populate("seller", ['username']);
    }

    function createItem(item) {
        return Item.create(item);
    }


    function deleteItem(id) {
        return Item.findByIdAndRemove(id);
    }


    function updateItem(id, newItem) {
        console.log(newItem);
        delete newItem._id;
        return Item.findByIdAndUpdate(id, newItem);
    }
    
    function search(searchParameter) {
        return Item
            .find(
                { $text : { $search : searchParameter } },
                { score : { $meta: "textScore" } }
            )
            .sort({ score : { $meta : 'textScore' } })
            .populate("seller", ["username"]);
    }
};