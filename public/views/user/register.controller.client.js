(function() {
   angular
       .module("Thrifty")
       .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.user = {};
        vm.register = register;

        function register(username, password) {

            if (username && password) {
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