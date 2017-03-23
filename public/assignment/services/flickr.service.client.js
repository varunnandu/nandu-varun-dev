
(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService",FlickrService);

    function FlickrService($http){
        var key = "1ae7fc67037ab33975cbe1818ad80a7c";
        var secret = "03a71cc9b82f6a4d";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        var api={
            "searchPhotos":searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();