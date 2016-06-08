/**
 * Created by alexgomez on 5/31/16.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;
    

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(
                function(user) {
                    console.log("found the user");
                    res.json(user)
                },
                function(err) {
                    res.status(404).send("Couldn't add user")
                });
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove user with ID: " + id);
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
                console.log(user);
                res.json(user);
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