(function () {
    angular
        .module("MovieNow")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user);
            promise.success(function(user){
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var resUser = response.data;
                            if (resUser) {
                                UserService.setCurrentUser(resUser);
                                $location.url("/home/")
                            }
                        },
                        function (err) {
                            vm.error = "Cannot log in";
                        });
            });
            promise.error(function(response){
                vm.error = "User Not Found";
            });
        }
    }
})();

