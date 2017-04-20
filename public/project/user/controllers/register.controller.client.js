
(function(){
    angular
        .module("MovieNow")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
                UserService
                    .findUserByUsername(user)
                    .success(function (response) {
                        vm.error = "sorry that username is taken"
                    })
                    .error(function () {
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                if (user) {
                                    redirectToProfile(user);
                                }
                            })
                            .error(function () {
                                vm.error = 'sorry could not register';
                            });
                    });
        }

        function redirectToProfile(response) {
            var user = response.data;
            if (user) {
                UserService.setCurrentUser(user);
                $location.url("/home/");
            }
        }

    }
})();
