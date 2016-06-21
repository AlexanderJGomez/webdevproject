var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {
    var userModel = models.userModel;

    app.post("/api/register", register);

    function register(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function(user) {
                console.log(user);
                res.json(user)
            },
            function(err) {
                res.send(err);
            })
    }

};