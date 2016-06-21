module.exports = function(app) {

    var models = require("./models/models.js")();

    //pass in model - allows it to interact with persisting world. must create the model now
    var userService = require("./services/user.service.server.js")(app, models);

};