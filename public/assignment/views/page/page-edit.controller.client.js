/**
 * Created by alexgomez on 5/29/16.
 */
(function () {
   angular
       .module("WebAppMaker")
       .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        function init() {
            PageService.findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                });
        }
        init();
        vm.updatePage = updatePage;


        function updatePage(page) {
            PageService.updatePage(page._id, page)
                .then(function(response, err) {
                    if(err) {
                        vm.error = "Couldnt update"
                    }

                    if(response.data) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
                    }
                    else {
                        vm.error = "Couldnt update";
                    }

                })
        }

    }
})();