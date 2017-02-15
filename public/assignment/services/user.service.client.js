(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            //TODO: complete the CRUD functions
            "createUser": createUser,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername
        };
        return api;

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var u in users) {
                if (users[u]._username == username) {
                    return users[u];
                }
            }
                return null
        }

        function createUser(newUser) {
            var user = {
                username: newUser.username,
                password: newUser.password
            }
            users.push(user);
        }

        function deleteUser(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users.splice(u, 1);
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();