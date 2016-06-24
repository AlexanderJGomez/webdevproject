module.exports = function(app) {

    var models = require("./models/models.js")();

    var userService = require("./services/user.service.server.js")(app, models);
    var itemService = require("./services/item.service.server.js")(app, models);
    var purchaseService = require("./services/purchase.service.server")(app, models);

};