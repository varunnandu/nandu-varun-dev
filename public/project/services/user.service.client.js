(function () {

    angular
        .module("MovieNow")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            likeMovie: likeMovie,
            undoLikeMovie: undoLikeMovie,
            isMovieLiked: isMovieLiked,
            findAllLikedMovies: findAllLikedMovies,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login,
            updateUserAdmin: updateUserAdmin,
            createUserAdmin: createUserAdmin,
            deleteUserAdmin: deleteUserAdmin,
            findAllUsersAdmin: findAllUsersAdmin
        };
        return api;

        function updateUserAdmin(userId, user) {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function createUserAdmin(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function findAllUsersAdmin() {
            return $http.get("/api/project/admin/user");
        }

        function deleteUserAdmin(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function findUserByCredentials(user) {
            return $http.get("/api/project/user?username=" + user.username + "&password=" + user.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function likeMovie(userId, movieId) {
            return $http.put("/api/project/user/" + userId + "/movie/" + movieId + "/like");
        }

        function undoLikeMovie(userId, movieId) {
            return $http.put("/api/project/user/" + userId + "/movie/" + movieId + "/undolike");
        }

        function isMovieLiked(userId, movieId) {
            return $http.get("/api/project/user/" + userId + "/movie/" + movieId + "/ismovieliked");
        }


        function findAllLikedMovies(userId) {
            return $http.get("/api/project/user/" + userId + "/likes");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function logout() {
            return $http.get("/api/project/logout");
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }
    }

})();