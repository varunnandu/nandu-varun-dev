(function () {

    angular
        .module("MovieNow")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $routeParams, UserService) {
        var vm = this;
        vm.navigateUserId = $routeParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user != undefined && user != "0") {
                        vm.user = user;
                    }
                });

        }

        init();


        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/login");
                });
        }
    }

})();