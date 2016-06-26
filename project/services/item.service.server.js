module.exports = function(app, models) {
    var ItemModel = models.itemModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'./../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/item", createItem);
    app.get("/api/user/:userId/listings", findItemsBySeller);
    app.get("/api/item/:itemId", findItemById);
    app.put("/api/item/:itemId", updateItem);
    app.delete("/api/item/:itemId", deleteItem);
    app.post("/api/search", search);
    app.get("/api/item", getItems);

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

    function getItems(req, res) {
        ItemModel.getItems()
            .then(
                function(items) {
                    console.log(items);
                    res.send(items);
                },
                function(err) {
                    res.status(404).send("Error getting all items");
                });
    }

    function findItemsBySeller(req, res) {
        var id = req.params.userId;

        ItemModel.findItemsBySeller(id)
            .then(
                function(items) {
                    res.send(items);
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

    function search(req, res) {
        ItemModel.search(req.body.search)
            .then(function(items) {
                console.log(items);
                res.send(items);
            },
            function(err) {
                res.status(401).send(err);
            })
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

    function uploadImage(req, res) {
        console.log("In upload")

        var itemId      = req.body.itemId;
        var myFile        = req.file;
        var newItem = {};

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        if(!originalname)
            res.status(401).send("No image added")
            return;

        newItem.image = "/uploads/"+filename;
        newItem.seller = req.body.seller;
        newItem.description = req.body.description;
        newItem.name = req.body.name;
        newItem.price = req.body.price;
        console.log("In upload 2")
        console.log(newItem)
        if(itemId) {
            console.log("in update")
            ItemModel.updateItem(itemId, newItem)
                .then(function(item) {
                        console.log("Yo");
                        res.redirect("/profile/listings");
                    },
                    function(err) {
                        res.status(404).send("Error updating item");
                    })
        }
        else {
            console.log("in new")
            ItemModel.createItem(newItem)
                .then(function(item) {
                        res.redirect("/#/item/"+item._id);
                    },
                    function(err) {
                        res.status(404).send("Error updating item");
                    })
        }
    }
}