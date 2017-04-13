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
            var promise1 = UserService.findAdminUser(user.kindof);
            if (!promise1){
                var promise = UserService.findUserByCredentials(user.username, user.password, user.kindof);
                promise.success(function(user){
                    $location.url("/user/"+user._id);
                });
                promise.error(function(response){
                    vm.error = "User Not Found";
                });
            }
            else {
                var promise = UserService.findUserByCredentials(user.username, user.password, user.kindof);
                promise.success(function(user){
                    $location.url("/user/admin");
                });
                promise.error(function(response){
                    vm.error = "User Not Found";
                });
            }

        }
    }
})();

