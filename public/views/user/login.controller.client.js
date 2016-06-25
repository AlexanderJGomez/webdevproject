(function(){
    angular
        .module("Thrifty")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {

            if (username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function(response) {
                            var user = response.data;
                            // console.log("login controller");

                            if (user) {
                                $rootScope.currentUser = user;
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
    }
})();