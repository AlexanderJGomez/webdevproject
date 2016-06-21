module.exports = function() {

    var connectionString = "mongodb://localhost/cs4550summer1";

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);

    //Connecting to the .model.server.js, returns an API that has all the CRUD functions.
    var userModel = require("./user/user.model.server.js")();
    // var itemModel = require("./item/item.model.server.js")();
    // var purchaseModel = require("./purchase/purchase.model.server.js")();

    var models = {
        userModel: userModel
    };

    return models;
};
