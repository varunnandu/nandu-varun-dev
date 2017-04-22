(function () {
    angular
        .module("MovieNow")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $route, $location, UserService) {
        var vm = this;
        vm.navigateUserId = $routeParams.userId;
        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.updateProfileApi = "/api/project/user/" + user._id;

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



        function updateUser(user) {
            UserService
                .updateUser(vm.navigateUserId, user)
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        alert("Update Profile!");
                    }
                    else {
                        alert("Error updating user information!");
                    }
                });
        }

        function deleteUser(user) {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService
                    .deleteUserById(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url('/login');
                });
        }
    }
})();