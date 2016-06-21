module.exports = function() {

    var mongoose = require("mongoose");
    
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        getUsers: getUsers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    
    function createUser(user) {
        return User.create(user);
    }

    function getUsers() {
        return User.find({});
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    //Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    //Updates user instance whose _id is equal to parameter userId
    //sets first instance of _id's firstName and lastName field to the browser param user.firstName/lastName
    function updateUser(userId, user) {
        return User.update(
            {_id: userId},
            {$set:
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        );
    }

    //Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};