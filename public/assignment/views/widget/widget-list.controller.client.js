(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.sorted = sorted;
        vm.directiveData = {
            userId: vm.userId,
            websiteId: vm.websiteId,
            getSafeUrl: getSafeUrl,
            getSafeHtml: getSafeHtml
        }

        function init() {
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (res) {
                    vm.widgets = res.data;
                    vm.directiveData.widgets = res.data;
                    console.log(res.data);
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        function sorted(startIndex, endIndex) {
            if(startIndex != endIndex) {
                WidgetService.sorted(startIndex, endIndex, vm.pageId)
                    .then(function(res) {
                        console.log("May have sorted correctly")
                    })
            }
        }

        $(".widget-container")
            .sortable({axis: "y"});
        
    }
})();