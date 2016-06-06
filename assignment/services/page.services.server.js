/**
 * Created by alexgomez on 6/5/16.
 */
module.exports = function(app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite)
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;

        for(var i in pages) {
            if(pages[i].name === newPage.name) {
                res.send(null)
                return;
            }
        }

        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        res.json(newPage);
    }



    function deletePage(req, res) {
        var id = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove page with ID: " + id);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id == id) {
                res.send(pages[i]);
                return;
            }
        }
        res.status(404).send("Could not find page")
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for(var i in pages) {
            if(pageId == pages[i]._id) {
                pages[i].name = newPage.name;
                res.send(pages[i]);
                return;
            }
        }
        res.send(null);

    }




    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pageList = [];
        for(var i in pages) {
            if(pages[i].websiteId === websiteId) {
                pageList.push(pages[i]);
            }
        }

        res.send(pageList);
    }




}