module.exports = function(app, models) {
    var PurchaseModel = models.purchaseModel;
    app.get("/api/user/:userId/purchase", findPurchasesForUser);
    app.post("/api/user/:userId/purchase", createPurchase);
    app.get("/api/purchase/:purchaseId", populatePurchase);
    
    function findPurchasesForUser(req, res) {
        var userId = req.params.userId;
        
        PurchaseModel.findPurchasesForUser(userId)
            .then(function (purchases) {
                res.send(purchases);
            },
            function(err) {
                res.statusCode(err.message);
            })
    }


    function createPurchase(req, res) {
        var userId = req.params.userId;
        var items = req.body;
        PurchaseModel.createPurchase(userId, items)
            .then(function(purchase) {
                res.json(purchase)
            },
            function(err) {
                res.statusCode(err.message);
            })
    }

    function populatePurchase(req, res) {
        var purchaseId = req.params.purchaseId;

        PurchaseModel.populatePurchase(purchaseId)
            .then(function(purchase) {
                res.json(purchase);
            },
            function(err) {
                res.statusCode(401).send(err.message)
            })
    }


    
}