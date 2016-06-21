//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {
    var userModel = models.userModel;

    app.post("/api/register", register);
    app.get("/api/user", getUsers);


    function register(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function(user) {
                console.log("DICKS");
                console.log(user);
                res.json(user)
            },
            function(err) {
                res.send(err);
            })
    }


    function getUsers(req, res) {
        console.log("SUP")
        userModel.getUsers()
            .then(function(users) {
                res.json(users);
            },
            function(err) {
                res.status(409).send(err);
            })
    }

};