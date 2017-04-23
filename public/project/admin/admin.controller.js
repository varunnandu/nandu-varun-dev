
(function () {
    angular
        .module("MovieNow")
        .controller("AdminController", AdminController);

    function AdminController(UserService, ReviewService) {
        var vm = this;

        vm.remove = remove;
        vm.removeReview = removeReview;

        vm.update = update;
        vm.add = add;
        vm.select = select;

        function init() {
            vm.selected = -1;
            UserService
                .findAllUsersAdmin()
                .then
                (function (response) {
                    vm.users = response.data;
                    vm.inputUser = {};
                    vm.selected = -1;
                },

                    function (error) {
                    vm.error = error;
                });
            ReviewService
                .findAllReviewsAdmin()
                .then
                (function (response) {
                        vm.reviews = response.data;
                    },

                    function (error) {
                        vm.error = error;
                    });

        }

        init();


        function remove(user) {
            UserService
                .deleteUserAdmin(user._id)
                .then(function (response) {
                    vm.users = response.data;
                    vm.inputUser = {};
                    vm.selected = -1;
                },
                    function (error) {
                        vm.error = error;
                    });
        }
        function removeReview(review) {
            ReviewService
                .removeReviewAdmin(review._id)
                .then(function (response) {
                    console.log(response.data);
                        vm.reviews = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    });
        }

        function update(user) {
            UserService
                .updateUserAdmin(user._id, user)
                .then(function (response) {
                    vm.users = response.data;
                    vm.inputUser = {};
                    vm.selected = -1;
                },
                    function (error) {
                        vm.error = error;
                    });
        }

        function add(user) {
            UserService
                .createUserAdmin(user)
                .then(function (response) {
                    vm.users = response.data;
                    vm.inputUser = {};
                    vm.selected = -1;
                },
                    function (error) {
                        vm.error = error;
                    });
        }

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = 0;
        }

    }
})();