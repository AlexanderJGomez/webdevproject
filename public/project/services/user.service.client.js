/**
 * Created by alexgomez on 6/21/16.
 */
(function () {
    angular
        .module("Thrifty")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            checkLoggedin: checkLoggedin,
            register: register,
            login: login,
            logout: logout,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            //findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }

        function login(username, password) {
            var url = "/api/login";

            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function createUser(username, password) {
            var url = "/api/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }
    }
})();