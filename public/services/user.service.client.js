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
            deleteUser: deleteUser,
            addToCart: addToCart,
            populateCart: populateCart,
            removeFromCart: removeFromCart,
            purchase: purchase
        };
        return api;

        function updateUser(id, newUser) {
            // console.log("user service client");
            var url = "/api/user/"+id;
            return $http.put(url, newUser);
        }

        function populateCart(id) {
            var url = "/api/user/"+id+"/cart"
            return $http.get(url);
        }

        function logout() {
            return $http.post("/api/logout");
        }
        
        function purchase(userId, cart) {
            var url = "/api/user/"+userId+"/purchase";
            var cartObj = {cart: cart};
            return $http.post(url, cartObj);
        }
        
        function removeFromCart(userId, itemId) {
            var url = "/api/user/"+userId+"/cart";
            var itemObj = {itemId: itemId};
            return $http.put(url, itemObj);
        }

        function addToCart(userId, itemId) {
            var itemIdObj = {itemId: itemId};
            console.log("made it to client service");
            var url = "/api/user/" + userId + "/cart";
            return $http.post(url, itemIdObj);
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
            // console.log("In register");
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