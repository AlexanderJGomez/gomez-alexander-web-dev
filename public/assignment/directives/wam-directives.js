/**
 * Created by alexgomez on 6/12/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("sortableList", sortableList)

    function sortableList() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("div")
                .sortable({
                    start: function(event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);

                        var sortedElement = scope.data.widgets.splice(startIndex, 1)[0];
                        scope.data.widgets.splice(endIndex, 0, sortedElement);
                        console.log(scope.data.widgets);

                        scope.$apply();

                        // scope.$parent.model.sorted(startIndex, endIndex);
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            templateUrl: "./directives/sortableList.html",
            scope: {
                title:  "=",
                border: "=",
                data:   "=",
                reorder: "&sorted"
            },
            link: linker
        }
        
        
    }
})()