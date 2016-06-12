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
            WidgetService.createWidget(vm.pageId, { widgetType: "HEADER" })
                .then(function(res) {
                    var widget = res.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id)
                })
        }

        function createYouTube() {
            WidgetService.createWidget(vm.pageId, { widgetType: "YOUTUBE"})
                .then(function(res) {
                    var widget = res.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id)
                })
        }

        function createImage() {
            WidgetService.createWidget(vm.pageId, { widgetType: "IMAGE" })
                .then(function(res) {
                    var widget = res.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id)
                })
        }

    }


})();