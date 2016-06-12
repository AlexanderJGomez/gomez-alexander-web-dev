(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function findWebsiteById(wid) {
            var url = "/api/website/" + wid;
            return $http.get(url);
        }

        function updateWebsite(wid, website) {
            var url = "/api/website/" + wid;
            return $http.put(url, website);

        }

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                name: name,
                description: desc,
                developerId: developerId
            };
            var url = "/api/user/"+developerId + "/website";
            return $http.post(url, newWebsite);
        }

        function findWebsitesForUserId(userId) {
            var url = "/api/user/" + userId + "/website"
            return $http.get(url);
        }
    }
})();