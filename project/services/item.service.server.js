/**
 * Created by alexgomez on 6/21/16.
 */

module.exports = function(app, models) {
    var ItemModel = models.itemModel;

    app.get("/api/user/:userId/listings", findItemsBySeller);
    app.post("/api/user", createItem);

    function findItemsBySeller(req, res) {
        var id = req.params.userId;
        console.log(id);
        ItemModel.findItemsBySeller(id)
            .then(function(items) {
                res.send(items)
            },
            function(err) {
                res.status(404).send(err.message);
            })
    }

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

}