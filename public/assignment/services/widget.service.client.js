/**
 * Created by alexgomez on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsForPageId(pageId) {
            var w = [];
            for(var i in widgets) {
                if(pageId === widgets[i].pageId) {
                    w.push(widgets[i]);
                }
            }
            return w;
        }
        
        function createWidget(pageId, widget) {
            var newWidget = widget;
            newWidget.pageId = pageId;
            widgets.push(newWidget);
        }
        
        function findWidgetById(wid) {
            for(var i in widgets) {
                if(widgets[i]._id === wid) {
                    return widgets[i];
                }
            }
            return null;
        }
        
        function updateWidget(wid, widget) {
            switch(widget.widgetType) {
                case "HEADER":
                    console.log()
                    if(!(widget.name && widget.size && widget.text)) {
                        return null;
                    }
                    break;
                case "YOUTUBE":
                    if(!(widget.name && widget.width && widget.url)) {
                        return null;
                    }
                    break;
                case "IMAGE":
                    if(!(widget.name && widget.width && widget.url)) {
                        return null;
                    }
                    break;
                default:
                    break;
            }

            for(var i in widgets) {
                if(widgets[i]._id === wid) {
                    widgets[i].size = widget.size;
                    widgets[i].text = widget.text;
                    widgets[i].width = widget.width;
                    widgets[i].url = widget.url;
                    return true;
                }
            }
            return null;
        }

        function deleteWidget(wid) {
            for(var i in widgets) {
                if(widgets[i]._id === wid) {
                    widgets.splice(i, i);
                    return true;
                }
            }
            return false;
        }
        
        
        
    }
})();