/**
 * Created by alexgomez on 6/5/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.websiteId = $routeParams.websiteId;
        vm.selectPhoto = selectPhoto;
        
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            
            var widget = {
                url: url,
                widgetType: "IMAGE"
            }

            console.log(widget);
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function(response){
                    if(!response)
                        vm.error="Could not select photo";
                    else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                            "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                        return;
                    }
                },
                function(err) {
                    res.status(404).send("Error selecting photo");
                });
        }

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();