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
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.movieId = $routeParams.movieId;
        vm.myPagingFunction = myPagingFunction;
        var imageUrl = MovieService.getImageURL();
        vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);


        function init() {
            $('[data-toggle="tooltip"]').tooltip();
            vm.review = {
                "rating": 0,
                "title": "",
                "description": ""
            };
            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findUserById(vm.user._id);
                    }
                })
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;

                        UserService
                            .findUserById(vm.navigateUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navigatedUser = user;
                                }
                            });
                    }
                });

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

        function movieAvgRatingByMovieId(reviews) {
            var avgRating = 0;
            for (var i = 0; i < reviews.length; i++) {
                avgRating += parseInt(reviews[i].rating);
            }
            vm.avgRating = (avgRating / reviews.length);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }
        function findAllReviewsByMovieId(movieId) {
            ReviewService
                .findAllReviewsByMovieId(movieId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews.push(response.data);
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                        isMovieLiked();
                    }
                });
        }

        function addReview(review) {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.reviews.push(response.data);
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                        return MovieService.addMovie(vm.movie);
                    }
                })
                .then(function (response) {
                    console.log("Movie Inserted !");
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "_id": vm.reviews[index]["_id"],
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "timestamp": vm.reviews[index]["timestamp"],
                "movieId": vm.reviews[index]["movieId"],
                "userId": vm.reviews[index]["userId"],
                "rating": vm.reviews[index]["rating"]
            }
            vm.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(vm.movieId, review._id, review)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.reviews[vm.selectedIndex] = review;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                    }
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(vm.movieId, reviewId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(index, 1);
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                    }
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }

        function findUserByReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response.data) {
                            reviews[index].userFirstName = response.data.firstName;
                            reviews[index].imgUrl = response.data.imgUrl;
                        }
                    });
            });
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


        function likeMovie() {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            UserService
                .likeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.isLiked = true;
                        return MovieService.addMovie(vm.movie);
                    }
                })
                .then(function (response) {
                    console.log("Movie Inserted !");
                });
        }

        function undoLikeMovie() {
            UserService
                .undoLikeMovie(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
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
                    if (user) {
                        console.log(user);
                        vm.isLiked = true;
                    }
                    else {
                        vm.isLiked = false;
                    }
                });
        }
    }

})();