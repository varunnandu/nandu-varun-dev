(function(){
    angular
        .module("MovieNow")
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "home/templates/main-page.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "home/templates/main-page.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: 'user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/home/:movieTitle",{
                templateUrl: 'movie/templates/movie-list.view.client.html',
                controller: 'MovieListController',
                controllerAs: 'model'
            })
            .when("/home/movie/:movieId",{
                templateUrl: 'movie/templates/movie-details.view.client.html',
                controller: 'MovieDetailsController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            });
/*
            .when("/user/:uid/website", {
                templateUrl: "websites/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "websites/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "websites/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "pages/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "pages/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "pages/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'widgets/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'widgets/templates/widget-choose.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'widgets/templates/widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr",{
                templateUrl: 'widgets/templates/widget-flickr-search.view.client.html'
                ,controller: "FlickrImageSearchController",
                controllerAs: "model"
            });
*/

    }
})();