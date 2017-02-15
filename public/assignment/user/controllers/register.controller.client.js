(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService) {
        var vm = this;

        // event handlers
        vm.addUser = addUser;
        function init() {
        }
        init();

        function addUser(newUser) {
            var user = UserService.createUser(newUser);
            if(user != null) {
                vm.message = "User Successfully Added!"
            } else {
                vm.error = "Unable to add user";
            }
        }
    }
})();