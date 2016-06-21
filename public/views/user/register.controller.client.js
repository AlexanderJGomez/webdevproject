(function() {
   angular
       .module("Thrifty")
       .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.user = {};
        vm.register = register;

        function register(user) {

            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $location.url("/profile/" + user._id);
                        console.log(response.data);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
    }
})();
