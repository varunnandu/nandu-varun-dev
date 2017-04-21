
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
            var flag = validateUser(user);
            if (flag) {
                UserService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        vm.error = "";
                        var resUser = response.data;
                        if (resUser != "null") {
                            vm.error = "User with username already exists.";
                        }
                        else {
                            UserService
                                .createUser(user)
                                .then(function (res) {
                                    if (res.data) {
                                        redirectToProfile(res);
                                    }
                                });

                        }
                    });
            }
            else {
                vm.error = "Something went wrong. Please try again.";
            }
        }

        function redirectToProfile(response) {
            var user = response.data;
            if (user) {
                UserService.setCurrentUser(user);
                $location.url("/user/"+user._id);
            }
        }

        function validateUser(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
                flag = flag && user.firstName;
                flag = flag && user.lastName;
                flag = flag && user.email;

                if (user.password == user.verifyPassword)
                    flag = flag && true;
                else
                    flag = flag && false;
            }
            else {
                flag = flag && false;
            }

            return flag;
        }
    }
})();
