/**
 * Created by alexgomez on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    function PageService() {
        var api = {
            createPage: createPage,
            findPagesByWebsiteId : findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }
        return api;

        function createPage(websiteId, page) {
            var newPage = page;
            newPage.websiteId = websiteId;
            newPage._id = new Date().getTime() + "";
            pages.push(newPage);
        }

        function findPagesByWebsiteId(websiteId) {
            var webs = [];
            for(var i in pages) {
                if(websiteId == pages[i].websiteId) {
                    webs.push(pages[i]);
                }
            }
            return webs;
        }

        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId){
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages.splice(i, i);
                    return true;
                }
            }
            return false;
        }

    }
})();