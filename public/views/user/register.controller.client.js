(function() {
   angular
       .module("Thrifty")
       .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.user = {};
        vm.register = register;

        function register(username, password) {

            UserService
                .register(username, password)
                .then(
                    function(response) {
                        var user = response.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        vm.error = err.data;
                    }
                );
        }
    }
})();