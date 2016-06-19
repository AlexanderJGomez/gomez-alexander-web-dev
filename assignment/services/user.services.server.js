/**
 * Created by alexgomez on 5/31/16.
 */
module.exports = function(app, models) {

    var passport = require("passport");
    var LocalStrategy = require('passport-local').Strategy;
    var userModel = models.userModel;
    var bcrypt = require("bcrypt-nodejs")
    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/profile',
            failureRedirect: '/assignment/#/login'
        }))
    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('wam'), login)
    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);
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

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("in fb strat")
        userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        }
                        return userModel
                            .createUser(user);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );

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



    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(
                function(user) {
                    console.log("in create user");
                    res.json(user)
                },
                function(err) {
                    res.status(404).send("Couldn't add user")
                });
    }


    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel.deleteUser(id)
            .then(function(user) {
                res.json(user)
            },
            function(err) {
                res.status(404).send("Unable to remove user with ID: " + id);
            })
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel.updateUser(id, newUser)
            .then(function(user) {
                res.json(user);
            },
            function(err) {
                res.status(400).send("User with ID: "+ id +" not found");
            })
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        userModel
            .findUserById(userId)
            .then(function(user) {
                res.json(user);
            },
            function(err) {
                res.status(404).send("Could not find user");
            })

    }


    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            userModel.getUsers()
                .then(function(users) {
                    res.send(users)
                })
        }
    }




    function findUserByCredentials(username, password, res) {
        userModel.findUserByCredentials(username, password)
            .then(function(user) {
                if(user) {
                    res.json(user);
                }
                else {
                    res.send(null);
                }
            },
            function(err) {
                res.status(404).send("Could not find user by credentials")
            })
    }


    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }
};