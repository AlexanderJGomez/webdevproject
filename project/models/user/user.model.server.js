module.exports = function() {

    var mongoose = require("mongoose");
    
    var UserSchema = require("./user.schema.server.js")();
    // var ItemSchema = require("../item/item.schema.server")();
    var User = mongoose.model("User", UserSchema);
    // var Item = mongoose.model("Item", ItemSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addToCart: addToCart,
        populateCart: populateCart
    };

    return api;

    function findUserById(id) {
        return User.findById(id);
    }

    function createUser(user) {
        return User.create(user);
    }
    
    function addToCart(userId, itemId) {
        console.log("In here")
        console.log(itemId)
        console.log(userId)
        return User.findByIdAndUpdate(userId, {$push: {cart: itemId}}, {safe: true, upsert: true, new : true});
    }
    
    function populateCart(id) {
        return User.findById(id).populate("cart");
    }


    function findUserByUsername(username) {
        return User.find({username: username});
    }

    function findUserByCredentials(username, password) {
        var pass = bcrypt.hashSync(password);
        return User.find({username:username, password:pass});
    }

    function deleteUser(id) {
        //delete user._id;
        return User.findByIdAndRemove(id);
    }

    function updateUser(id, newUser) {
        console.log(newUser);
        delete newUser._id;
        return User.findByIdAndUpdate(id, newUser);
    }
};