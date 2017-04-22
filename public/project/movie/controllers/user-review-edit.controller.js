(function () {

    angular
        .module("MovieNow")
        .controller("ReviewEditController", ReviewController);

    function ReviewController($routeParams, UserService, MovieService, ReviewService) {
        var vm = this;
        vm.updateReview = updateReview;
        vm.userId = $routeParams.userId;
        vm.movieId = $routeParams.movieId;
        vm.reviewId = $routeParams.reviewId;

        function init() {
            ReviewService
                .getCurrentReview(vm.reviewId)
                .then(function (response) {
                    vm.review = response.data;
                })
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.loggedInUserId = user._id;
                        return ReviewService.findAllReviewsByUserId(vm.userId);
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;

                        UserService
                            .findUserById(vm.userId)
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

        function updateReview(review) {
            ReviewService
                .updateReview(vm.movieId, review._id, review)
                .then(function (response) {
                    var status = response.data;
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.review = review;
                    }


                });
        }
    }

})();