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
                        console.log("The widget in widget edit is")
                        console.log(vm.widget);
                    }
                );
        }
        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function updateWidget(widget) {
            console.log(widget);
            if(widget.widgetType != "HTML" && widget.widgetType != "TEXT" && !widget.name) {
                vm.nameError = "Enter a name"
            }
            else {
                vm.nameError = null;
                WidgetService.updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        if (response.data) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                        }
                        else {
                            vm.error = "Could not update widget";
                        }
                    });
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .then(function(res) {
                    if(res.data) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                    else {
                        vm.error = 'Could not delete widget';
                    }
                })
        }

    }
})()