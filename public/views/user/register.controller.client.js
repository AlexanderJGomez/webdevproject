(function() {
   angular
       .module("Thrifty")
       .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.user = {};
        vm.register = register;

        function register(username, password, password2) {

            if (username && password && (password == password2)) {
                UserService
                    .register(username, password)
                    .then(
                        function(response) {
                            var user = response.data;
                            console.log(user);
                            $rootScope.currentUser = user;
                            $location.url("/profile");
                        },
                        function(err) {
                            vm.error = err.data;
                        }
                    );
            }
        }
    }
})();