/**
 * Created by alexgomez on 6/24/16.
 */
module.exports = function() {
    angular.module("Thrifty")
        .controller("CartController", CartController);
    
    function cartController($location, UserService, $rootScope) {
        var vm = this;
        
        function init() {
            vm.user = $rootScope.currentUser;
            UserService.populateCart(vm.user._id)
                .then(function(response) {
                    console.log(response.data);
                    vm.cart = response.data.cart;
                },
                function(err) {
                    console.log(err.message);
                })
        }
        
    }
    
    
}