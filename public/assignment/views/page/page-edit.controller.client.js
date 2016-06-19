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
        vm.deletePage = deletePage;


        function updatePage(page) {
            if(!page.name) {
                vm.error = "Enter a name";
            }
            else {
                PageService.updatePage(page._id, page)
                    .then(function (response) {
                        if (response.data) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
                        }
                        else {
                            vm.error = "Couldnt update";
                        }

                    })
            }
        }



        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(function(response) {
                    if(response.data) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId+ "/page")
                    }
                    else {
                        vm.error = "Couldn't delete page";
                    }
                })
        }

    }
})();