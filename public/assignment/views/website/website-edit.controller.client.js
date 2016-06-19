(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data;
                });
        }
        init();
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId)
                .then(function(response, err) {
                    if(err)
                        vm.error= "unable to delete website"
                    $location.url("/user/"+vm.userId+"/website");

                })
            
        }

        function updateWebsite(wid, website) {
            console.log(website);
            if(!website.name) {
                vm.error = "Enter a name"
            }
            else {
                var result = WebsiteService.updateWebsite(wid, website);
                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                }
                else {
                    vm.error = "Unable to update website";
                }
            }
        }


    }
})();