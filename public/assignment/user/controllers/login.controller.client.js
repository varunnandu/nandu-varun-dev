(function () {
    angular
        .module("WebAppMaker")
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
                .findUserByCredentials(user.username, user.password);
            promise.success(function(user){
                    $location.url("/user/"+user._id);
            });
            promise.error(function(response){
                vm.error = "User Not Found";
            });
        }
    }
})();

