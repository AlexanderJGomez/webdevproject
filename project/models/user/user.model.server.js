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
        updateUser: updateUser
    };

    return api;

    function findUserById(id) {
        return User.findById(id);
    }

    function createUser(user) {
        return User.create(user);
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