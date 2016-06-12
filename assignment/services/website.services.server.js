/**
 * Created by alexgomez on 6/5/16.
 */
module.exports = function(app, models) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.put("/api/website/:websiteId", updateWebsite);

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;

        websiteModel
            .createWebsite(userId, website)
            .then(
                function (website) {
                    userModel.addWebsite(userId, website._id)
                        .then(function(user) {
                            res.json(website);
                        })

                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        websiteModel.deleteWebsite(id)
            .then(function(website) {
                res.send(website);
            },
                function(err) {
                    res.status(404).send("Could not delete website");
                }
        )
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel.updateWebsite(id, newWebsite)
            .then(function(website) {
                res.json(website);
            },
            function(err) {
                res.status(404).send("Could not update website");
            })
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.findWebsiteById(websiteId)
            .then(function(website) {
                res.json(website);
            },
            function(err) {
                res.status(404).send("Error finding website");
            })
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }


}