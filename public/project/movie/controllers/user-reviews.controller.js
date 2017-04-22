(function () {

    angular
        .module("MovieNow")
        .controller("ReviewController", ReviewController);

    function ReviewController($routeParams, UserService, MovieService, ReviewService) {
        var vm = this;
        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.movieId = $routeParams.movieId;

        vm.navigateUserId = $routeParams.userId;

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
                        vm.loggedInUserId = user._id;
                        return ReviewService.findAllReviewsByUserId(vm.navigateUserId);
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
        }

        init();


        function addReview(review) {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.reviews = [];
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
                        findUserByReviewUserId(vm.reviews);
                        movieAvgRatingByMovieId(vm.reviews);
                    }
                });
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
    }

})();