(function () {

    angular
        .module("MovieNow")
        .controller("MovieListController", MovieListController);

    function MovieListController($routeParams, $scope, MovieService) {
        var vm = this;

        vm.getMoviesByTitle = getMoviesByTitle;
        vm.movieTitle = $routeParams.movieTitle;
        var imageUrl = MovieService.getImageURL();
        vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);


        function init() {
            vm.paginationCounter = 1;

            if (vm.movieTitle) {
                getMoviesByTitle(vm.movieTitle, vm.paginationCounter);
            }
        }

        init();
        function getMoviesByTitle(movieTitle, page) {
            MovieService
                .getMoviesByTitle(movieTitle, page)
                .then(
                    function (response) {
                        var movies = preprocessResponse(response);
                        if (movies.length != 0) {
                            vm.movies = movies;
                            vm.error = null;
                        }
                        else {
                            vm.error = "Change a few things up and try submitting again.";
                        }
                    },
                    function (err) {
                        vm.error = "Change a few things up and try submitting again.";
                    });
        }

        function preprocessResponse(response) {
            var result = [];
            response.data.results.forEach(function (element1, index1, array1) {
                var genres = [];
                if (element1.genre_ids.length != 0 && element1.genre_ids) {
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        try {
                            var genreName = getValue(element2);
                            genres.push("#" + genreName);
                        }
                        catch (err) {

                        }
                    });
                }
                else {
                    genres.push("#NA");
                }
                element1.genres = genres;

                if (element1.backdrop_path) {
                    element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                }
                else {
                    element1.imageUrl = "/project/images/Sorry-image-not-available.png";
                }

                if (!element1.overview) {
                    element1.overview = "There is no overview for this movie.";
                }

                if (element1.imageUrl != "/project/images/Sorry-image-not-available.png") {
                    result.push(element1);
                }
            });

            return result;
        }

    }

})();