(function () {

    angular
        .module("MovieNow")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.toggleMenu = toggleMenu;
        vm.logout = logout;

        function init() {
             UserService
                 .getCurrentUser()
                 .success(function () {
                     console.log("Logged IN")
                 })
                 .error(function () {
                    console.log("Not logged in");
                 });

        }

        init();


        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/home/");
                });
        }
    }

})();