/**
 * Created by alexgomez on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(page) {
            var result = PageService.createPage(vm.websiteId, page);
            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else {
                vm.error = "Unable to create Page"
            }
        }


    }
})();