/**
 * Created by alexgomez on 6/5/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "edd57614ac64c812c9d94622b362fe99";
    var secret = "30107a8edb9c1ec0";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&callback=JSON_CALLBACK";

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos,
            updateWidget: updateWidget
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function updateWidget(widgetId, photo) {
            var url = "/api/widget/" + widgetId;
            var widget = {};
            widget.url = photo.url;
            return $http.put(url, widget);
        }
    }
})();