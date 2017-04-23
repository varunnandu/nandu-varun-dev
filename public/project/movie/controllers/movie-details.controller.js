(function () {

    angular
        .module("MovieNow")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController($routeParams, $sce, ReviewService, MovieService, UserService) {
        var vm = this;

        vm.movieDetailsByMovieId = movieDetailsByMovieId;
        vm.likeMovie = likeMovie;
        vm.undoLikeMovie = undoLikeMovie;
        vm.addReview = addReview;
        vm.movieId = $routeParams.movieId;
        var imageUrl = MovieService.getImageURL();
        vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);


        function init() {
            $('[data-toggle="tooltip"]').tooltip();


            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);
            ReviewService
                .findAllReviewsByMovieId(vm.movieId)
                .then(function (response){
                    vm.reviews = response.data;
                });
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        isMovieLiked();
                        return UserService.findUserById(vm.user._id);
                    }
                })
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


        function addReview(review) {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.reviews.push(response.data);
                        return MovieService.addMovie(vm.movie);
                    }
                })
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


        function likeMovie() {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            UserService
                .likeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isLiked = true;
                        return MovieService.addMovie(vm.movie);
                    }
                })

        }

        function undoLikeMovie() {
            UserService
                .undoLikeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isLiked = false;
                    }
                });
        }

        function isMovieLiked() {
            UserService
                .isMovieLiked(vm.user._id, vm.movieId)
                .then(function (response) {
                    var user = response.data;
                    if (user && user != "null") {
                        vm.isLiked = true;
                    }
                    else {
                        vm.isLiked = false;
                    }
                });
        }
    }

})();