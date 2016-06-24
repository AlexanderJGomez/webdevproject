
module.exports = function(app, models) {
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);
    app.put("/api/user/:userid/cart", addToCart);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function authenticate(req, res, next) {
        console.log("authenticate");
        if(req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
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
        console.log("local strategy");
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user[0] && bcrypt.compareSync(password, user[0].password)) {
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

    function addToCart(req, res) {
        userModel.addToCart(req.params.userId, req.body.itemId)
            .then(function(user) {
                res.json(user);
            },
            function(err) {
                res.statusCode(err.message);
            })
    }

    function getUsers(req, res) {
        userModel.getUsers()
            .then(function(users) {
                res.json(users);
            },
            function(err) {
                res.status(409).send(err);
            });
    }
    

    function login(req, res) {
        console.log("logged in");
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        console.log("logged out");
        req.logout();
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
                    res.status(400).send("Username already exists");
                    return;
                }
                else {
                    password = bcrypt.hashSync(req.body.password);
                    console.log("register inside: User Service Server");
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
            });
    }

    function updateUser(req, res) {

        var id = req.body._id;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function deleteUser(req, res) {
        console.log("delete user");
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }
};