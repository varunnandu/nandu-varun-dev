(function () {

    angular
        .module("MovieNow")
        .controller("MovieDetailsController", MovieListController);

    function MovieListController($routeParams, $sce, MovieService) {
        var vm = this;

        vm.movieDetailsByMovieId = movieDetailsByMovieId;
        vm.movieId = $routeParams.movieId;
        vm.myPagingFunction = myPagingFunction;
        var imageUrl = MovieService.getImageURL();
        vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);


        function init() {
            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);


            MovieService
                .findSimilarMovies(vm.movieId)
                .then(
                    function (response) {
                        var similar = [];
                        response.data.results.forEach(function (element1, index1, array1) {
                            if (element1.backdrop_path) {
                                element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                                similar.push(element1);
                            }
                        });
                        vm.similar = similar;
                    });

            MovieService
                .getMovieCredits(vm.movieId)
                .then(function (response) {
                    var casts = [];
                    response.data.cast.forEach(function (element1, index1, array1) {
                        if (element1.profile_path && element1.name && element1.character) {
                            element1.imageUrl = vm.imageUrl + element1.profile_path;
                            casts.push(element1);
                        }
                    });
                    vm.casts = casts;
                });

            MovieService
                .getVideoKey(vm.movieId)
                .then(function (response) {
                    var videos = response.data.results;
                    videos.forEach(function (element, index, array) {
                        element.url = $sce.trustAsResourceUrl(MovieService.getYoutubeEmbedUrl(element.key));
                    });
                    vm.videos = videos;
                });

            movieDetailsByMovieId(vm.movieId);
        }

        if (vm.movieId) {
            init();
        }


        function movieDetailsByMovieId(movieId) {
            MovieService
                .getMovieDetailsById(movieId)
                .then(function (response) {
                    var movie = response.data;
                    if (movie.backdrop_path) {
                        movie.imageUrl = vm.imageUrl + movie.backdrop_path;
                    }
                    else {
                        movie.imageUrl = "/project/images/Sorry-image-not-available.png";
                    }

                    vm.movie = movie;
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
        function myPagingFunction() {
            if (vm.paginationCounter == 1) {
                vm.paginationCounter = vm.paginationCounter + 1;
            }
            else {
                if (vm.movieTitle) {
                    vm.busy = true;
                    MovieService
                        .getMoviesByTitle(vm.movieTitle, vm.paginationCounter)
                        .then(
                            function (response) {
                                var movies = preprocessResponse(response);
                                if (movies.length != 0) {
                                    vm.movies.push.apply(vm.movies, movies);
                                    vm.busy = false;
                                }
                            });
                    vm.paginationCounter = vm.paginationCounter + 1;
                }
            }
        }
    }

})();