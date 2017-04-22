(function () {

    angular
        .module("MovieNow")
        .factory("ReviewService", ReviewService);


    function ReviewService($http) {
        var api = {
            findAllReviewsByMovieId: findAllReviewsByMovieId,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview,
            findAllReviewsByUserId: findAllReviewsByUserId
        };
        return api;

        function findAllReviewsByMovieId(movieId) {
            return $http.get("/api/project/movie/" + movieId + "/reviews");
        }

        function addReview(userId, movieId, review) {
            return $http.post("/api/project/user/" + userId + "/movie/" + movieId, review);
        }

        function updateReview(movieId, reviewId, review) {
            return $http.put("/api/project/movie/" + movieId + "/review/" + reviewId, review);
        }

        function deleteReview(movieId, reviewId) {
            return $http.delete("/api/project/movie/" + movieId + "/review/" + reviewId);
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/project/user/" + userId + "/reviews");
        }
    }

})();