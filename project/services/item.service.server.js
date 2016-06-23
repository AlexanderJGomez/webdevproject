module.exports = function(app, models) {
    var ItemModel = models.itemModel;

    app.post("/api/user", createItem);
    app.get("/api/user/:userId/listings", findItemsBySeller);
    app.get("/api/item/:itemId", findItemById);
    app.put("/api/item/:itemId", updateItem);
    app.delete("/api/item/:itemId", deleteItem);

    function createItem(req, res) {
        var item = req.body;

        ItemModel.createItem(item)
            .then(function(item) {
                res.json(item)
            },
            function(err) {
                res.status(404).send(err.message);
            })
    }

    function findItemsBySeller(req, res) {
        var id = req.params.userId;
        console.log(id);
        ItemModel.findItemsBySeller(id)
            .then(
                function(items) {
                    res.send(items)
                },
                function(err) {
                    res.status(404).send(err.message);
                }
            );
    }

    function findItemById(req, res) {
        var id = req.params.itemId;

        ItemModel.findItemById(id)
            .then(
                function(item) {
                    res.send(item);
                },
                function(err) {
                    res.status(404).send(err.message);
                }
            );
    }

    function updateItem(req, res) {
        var id = req.params.itemId;
        var newItem = req.body;

        ItemModel
            .updateItem(id, newItem)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update item with ID: " + id);
                }
            );
    }

    function deleteItem(req, res) {
        var id = req.params.itemId;

        ItemModel
            .deleteItem(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove item with ID: " + id);
                }
            );
    }
}