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
            "findAdminUser": findAdminUser,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function findAdminUser(kind) {
            return $http.get("/api/user?kindof="+kind);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);

        }

        function findUserByUsername(username){
            return $http.get("/api/user?username="+username);
        }

        function createUser(user) {
            console.log("from client service", user);
                return $http.post("/api/user/", user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByCredentials(username, password, kindof) {
            return $http.get("/api/user?username="+username+"&password="+password+"&kindof="+kindof);
        }

    }
})();