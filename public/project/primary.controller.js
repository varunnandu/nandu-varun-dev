"use strict";
(function () {

    angular
        .module("MovieNow")
        .controller("PrimaryController", PrimaryController);

    function PrimaryController($location, $rootScope) {
        function init() {
            $rootScope.$on('$viewContentLoading',
                function (event, viewConfig) {
                    $rootScope.isToggleMenuVisible = $location.path("/profile");
                });

            $rootScope.$on('$routeChangeSuccess', function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        }

        init();
    }

})();
