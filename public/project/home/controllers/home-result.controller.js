(function () {

    angular
        .module("MovieNow")
        .controller("HomeResultController", HomeResultController);

    function HomeResultController($stateParams, $scope, MovieService) {
        var vm = this;

        vm.getMoviesByTitle = getMoviesByTitle;
        vm.myPagingFunction = myPagingFunction;

        vm.movieTitle = $stateParams.movieTitle;

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
                        var movies = $scope.homeControllerModel.preprocessResponse(response);
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
                                var movies = $scope.homeControllerModel.preprocessResponse(response);
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