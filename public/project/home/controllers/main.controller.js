(function () {

    angular
        .module("MovieNow")
        .controller("MainController", MainController);

    function MainController($location, MovieService) {
        var vm = this;

        vm.slide = slide;
        vm.preprocessResponse = preprocessResponse;
        vm.myFunc = myFunc;

        var slides = [];

        function init() {
            $('#myCarousel').carousel({
                interval: 5000
            });

            var imageUrl = MovieService.getImageURL();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);

            MovieService
                .getGenreList()
                .then(function (response) {
                    var map = new Object();
                    response.data.genres.forEach(function (element, index, array) {
                        map[element.id] = element.name;
                    });
                    vm.genreList = map;
                });

            MovieService
                .findUpcomingMovies()
                .then(function (response) {
                    response.data.results.forEach(function (element1, index1, array1) {
                        if (element1.backdrop_path) {
                            element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                            slides.push(element1);
                        }
                    });
                });

            vm.slides = slides;
        }

        init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        };

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
                    element1.imageUrl = "/project/client/images/Image-Not-Available.jpg";
                }

                if (!element1.overview) {
                    element1.overview = "There is no overview for this movie.";
                }

                if (element1.imageUrl != "/project/client/images/Image-Not-Available.jpg") {
                    result.push(element1);
                }
            });

            return result;
        }

        function getValue(key) {
            return vm.genreList[key];
        }

        function myFunc(event, movieTitle) {
            if (event.keyCode === 13) {
                $location.url("/home/"+movieTitle);
            }
        }
    }

})();