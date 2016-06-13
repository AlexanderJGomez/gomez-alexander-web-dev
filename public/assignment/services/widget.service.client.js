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
            deleteWidget: deleteWidget,
            sorted: sorted
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
            console.log("Inside client service")
            return $http.post(url, newWidget);
        }

        function sorted(startIndex, endIndex, pageId) {
            console.log("sorting");
            console.log(startIndex);
            console.log(endIndex);
            return $http.put("/api/page/"+pageId+"/widget?start="+startIndex+"&end="+endIndex);
        }
        

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }
        
        function updateWidget(wid, widget) {
            var url = "/api/widget/" + wid;
            return $http.put(url, widget);
        }

        function deleteWidget(wid) {
            var url = "/api/widget/" + wid;
            return $http.delete(url);
        }
        
        
        
    }
})();