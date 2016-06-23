/**
 * Created by alexgomez on 6/21/16.
 */
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
        search: search
    };

    return api;

    function findItemById(id) {
        return Item.findById(id);
    }

    function findItemsBySeller(id) {
        return Item.find({seller: id});
    }

    function createItem(item) {
        return Item.create(item);
    }


    function deleteItem(id) {
        return Item.findByIdAndRemove(id);
    }


    function updateItem(id, newItem) {
        console.log(newItem);
        return Item.findByIdAndUpdate(id, newItem);
    }
    
    function search(searchParameter) {
        return Item
            .find(
                { $text : { $search : searchParameter } },
                { score : { $meta: "textScore" } }
            )
            .sort({ score : { $meta : 'textScore' } });
    }
};