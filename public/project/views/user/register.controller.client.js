/**
 * Created by Michael on 6/18/2016.
 */
(function() {
   angular
       .module("Thrifty")
       .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.user = {}
        vm.register = register;

        function register(user) {
            UserService.register(user)
                .then(function(response) {
                    console.log(response.data);
                },
                function(err) {
                    console.log(err);
                })
        }
    }




})();
