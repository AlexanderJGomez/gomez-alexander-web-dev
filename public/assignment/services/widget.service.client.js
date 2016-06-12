/**
 * Created by alexgomez on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsForPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            var widgs = $http.get(url);
            return widgs;
        }
        
        function createWidget(pageId, widget) {
            var newWidget = widget;
            newWidget.pageId = pageId;
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, newWidget);
        }
        

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }
        
        function updateWidget(wid, widget) {
            console.log("Updating widget in client sevices");
            var url = "/api/widget/" + wid;
            return $http.put(url, widget);
        }

        function deleteWidget(wid) {
            var url = "/api/widget/" + wid;
            return $http.delete(url);
        }
        
        
        
    }
})();