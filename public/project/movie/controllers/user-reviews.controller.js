(function () {

    angular
        .module("MovieNow")
        .controller("ReviewController", ReviewController);

    function ReviewController($routeParams, UserService, MovieService, ReviewService) {
        var vm = this;
        vm.deleteReview = deleteReview;
        vm.navigateUserId = $routeParams.userId;

        function init() {
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

        function deleteReview(movieId, reviewId) {
            ReviewService
                .deleteReview(movieId, reviewId)
                .then(function (response) {
                    var status = response.data;
                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(reviewId, 1);
                    }
                });
        }
    }

})();