/**
 * Created by alexgomez on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(function(response) {
                    vm.pages = response.data;
                });
        }
        init();
    }
})();