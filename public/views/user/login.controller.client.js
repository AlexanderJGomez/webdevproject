(function(){
    angular
        .module("Thrifty")
        .controller("LoginController", LoginController);

    function LoginController($location, $window, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {

            UserService
                .login(username, password)
                .then(
                    function(response) {
                        var user = response.data;
                        // console.log("login controller");
                        
                        if (user) {
                            $window.sessionStorage.currentUser = user;
                            var id = user._id;
                            $location.url("/profile");
                        }
                    },
                    function(error) {
                        vm.error = "User not found";
                    }
                );
        }
    }
})();