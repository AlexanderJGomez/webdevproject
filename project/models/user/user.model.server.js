module.exports = function() {

    var mongoose = require("mongoose");
    
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addToCart: addToCart,
        populateCart: populateCart,
        removeFromCart: removeFromCart,
        purchase: purchase
    };

    return api;

    function findUserById(id) {
        return User.findById(id);
    }

    function createUser(user) {
        return User.create(user);
    }
    
    function purchase(id) {
        console.log("In purchase in user");
        return User.findByIdAndUpdate(id, {cart: []});
    }
    
    function addToCart(userId, itemId) {
        return User.findByIdAndUpdate(userId, {$push: {cart: itemId}}, {safe: true, upsert: true, new : true});
    }

    function removeFromCart(userId, itemId) {
        return User.findByIdAndUpdate(userId, {$pull: {cart: itemId}}, {safe: true, upsert: true, new : true});
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
        return User.findByIdAndRemove(id);
    }

    function updateUser(id, newUser) {
        delete newUser._id;
        return User.findByIdAndUpdate(id, newUser);
    }
};