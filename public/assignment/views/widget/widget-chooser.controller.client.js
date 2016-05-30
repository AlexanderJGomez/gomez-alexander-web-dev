/**
 * Created by alexgomez on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController)
    
    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.createHeader = createHeader;
        vm.createYouTube = createYouTube;
        vm.createImage = createImage;

        function createHeader() {
            var newWidget = {
                widgetType: "HEADER",
                _id: (new Date().getTime() + "")
            }
            WidgetService.createWidget(vm.pageId, newWidget)
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id)
        }

        function createYouTube() {
            var newWidget = {
                widgetType: "YOUTUBE",
                _id: (new Date().getTime() + "")
            }
            WidgetService.createWidget(vm.pageId, newWidget)
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id)
        }

        function createImage() {
            var newWidget = {
                widgetType: "IMAGE",
                _id: (new Date().getTime() + "")
            }
            WidgetService.createWidget(vm.pageId, newWidget)
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id)
        }

    }


})();