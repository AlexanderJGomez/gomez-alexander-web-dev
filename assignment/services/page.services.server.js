/**
 * Created by alexgomez on 6/5/16.
 */
module.exports = function(app, models) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite)
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    function createPage(req, res) {
        var newPage = req.body;
        pageModel.createPage(newPage)
            .then(function(page) {
                websiteModel.addPage(page._website, page._id)
                    .then(function(website) {
                        res.json(page);
                    })
            },
            function(err) {
                res.status(404).send('Error creating new page');
            });
    }



    function deletePage(req, res) {
        var id = req.params.pageId;
        pageModel.deletePage(id)
            .then(function(page) {
                res.json(page)
            },
            function(err) {
                res.status(404).send("Could not delete page");
            })
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        pageModel.findPageById(id)
            .then(function(page) {
                res.json(page);
            },
            function(err) {
                res.status(404).send("Could not find the page");
            })
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel.updatePage(pageId, newPage)
            .then(function(page) {
                res.json(page)
            },
            function(err) {
                res.status(404).send("Could not update page");
            })

    }




    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId)
            .then(function(pages) {
                res.send(pages);
            },
            function(err) {
                res.status(404).send("There was an error findig the pages");
            })
    }




}