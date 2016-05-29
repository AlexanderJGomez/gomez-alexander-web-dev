(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        console.log(vm.website);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }

        function updateWebsite(wid, website) {
            var result = WebsiteService.updateWebsite(wid, website);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to update website";
            }
        }


    }
})();