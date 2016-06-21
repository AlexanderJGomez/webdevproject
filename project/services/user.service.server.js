//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require('bcrypt');

    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('wam'), login)
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function authenticate(req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        console.log("Inside serialize user")
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("Inside deserialize user")
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user[0] && bcrypt.compareSync(password, user[0].password)) {
                        console.log("Matched user")
                        return done(null, user[0]);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    


    function getUsers(req, res) {
        userModel.getUsers()
            .then(function(users) {
                res.json(users);
            },
            function(err) {
                res.status(409).send(err);
            })
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        console.log('Logged out');
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel.findUserByUsername(username)
            .then(function(user) {
                if(user.length) {
                    res.status(400).send("Username already exists")
                    return;
                }
                else {
                    password = bcrypt.hashSync(req.body.password);
                    console.log("In register")
                    console.log(password);

                    return userModel.createUser({username: username, password: password});
                }
                res.send(200);
            })
            .then(function(user) {
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            })
    }
    
    

};