(function () {

    angular
        .module("MovieNow")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var creditsUrl = "https://api.themoviedb.org/3/movie/MOVIEID/credits?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en";
        var videoUrl = "https://api.themoviedb.org/3/movie/MOVIEID/videos?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en";
        var youtubeEmbedUrl = "https://www.youtube.com/embed/KEY";
        var similarUrl = "https://api.themoviedb.org/3/movie/MOVIEID/similar?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en";
        var upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en";
        var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en&query=TITLE&page=PAGE";
        var detailsUrl = "https://api.themoviedb.org/3/movie/ID?api_key=a1eeabc6332dbb0d0d874a6a8d6a6a29&language=en";
        var imageUrl = "https://image.tmdb.org/t/p/original/";

        var api = {
            findUpcomingMovies: findUpcomingMovies,
            findSimilarMovies: findSimilarMovies,
            getImageURL: getImageURL,
            getMoviesByTitle: getMoviesByTitle,
            getMovieDetailsById: getMovieDetailsById,
            getVideoKey: getVideoKey,
            getYoutubeEmbedUrl: getYoutubeEmbedUrl,
            getMovieCredits: getMovieCredits,
            addMovie: addMovie
        };
        return api;


        function findUpcomingMovies() {
            return $http.get(upcomingUrl);
        }


        function findSimilarMovies(movieId) {
            var url = similarUrl
                .replace("MOVIEID", movieId);
            return $http.get(url);
        }

        function getImageURL() {
            return imageUrl;
        }

        function getMoviesByTitle(movieTitle, page) {
            var url = searchUrl
                .replace("TITLE", movieTitle)
                .replace("PAGE", page);
            return $http.get(url);
        }

        function getMovieDetailsById(movieId) {
            var url = detailsUrl
                .replace("ID", movieId);
            return $http.get(url);
        }

        function getVideoKey(movieId) {
            var url = videoUrl
                .replace("MOVIEID", movieId);
            return $http.get(url);
        }

        function getYoutubeEmbedUrl(key) {
            var url = youtubeEmbedUrl
                .replace("KEY", key);
            return url;
        }

        function getMovieCredits(movieId) {
            var url = creditsUrl
                .replace("MOVIEID", movieId);
            return $http.get(url);
        }

        function addMovie(movie) {
            return $http.post("/api/project/movie", movie);
        }
    }
})();