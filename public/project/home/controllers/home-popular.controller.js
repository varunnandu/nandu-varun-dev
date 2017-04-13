(function () {

    angular
        .module("MovieNow")
        .controller("HomePopularController", HomePopularController);

    function HomePopularController($scope, MovieService) {
        var vm = this;

        vm.myPagingFunction = myPagingFunction;

        function init() {
            vm.paginationCounter = 1;

            MovieService
                .findPopularMovies(vm.paginationCounter)
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

        init();

        function myPagingFunction() {
            if (vm.paginationCounter == 1) {
                vm.paginationCounter = vm.paginationCounter + 1;
            }
            else {
                vm.busy = true;
                MovieService
                    .findPopularMovies(vm.paginationCounter)
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

})();