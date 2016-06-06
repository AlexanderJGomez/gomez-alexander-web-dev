/**
 * Created by alexgomez on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)

    function WidgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId  = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    }
                );
        }
        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function updateWidget(widget) {
            var result = WidgetService.updateWidget(vm.widgetId, widget)
                .then(function(response) {
                    if (response.data) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                    else {
                        vm.error = "Could not update widget";
                    }
                });
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
            else {
                vm.error = "Could not delete Widget";
            }
        }

    }
})()