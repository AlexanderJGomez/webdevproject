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
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            login: login,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser(id, newUser) {
            var url = "/api/user/"+id;
            return $http.put(url, newUser);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            }

            //console.log(user);
            return $http.post("/api/login", user);
        }

        function checkLoggedIn() {
            // console.log("userservice client");
            return $http.get("/api/loggedin")
        }


        function register(username, password) {
            console.log("In register");
            var url = "/api/register";
            
            var user = {
                username: username,
                password: password
            }
            return $http.post(url, user);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        function deleteUser(id) {
            var url = "/api/user/"+id;
            return $http.delete(url);
        }
        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
    }
})();