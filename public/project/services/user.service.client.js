(function () {
    angular
        .module("MovieNow")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);

        }

        function findUserByUsername(username){
            return $http.get("/api/user?username="+username);
        }

        function createUser(user) {
                return $http.post("/api/user/", user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

    }
})();