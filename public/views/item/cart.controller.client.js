/**
 * Created by alexgomez on 6/24/16.
 */
(function() {
    angular.module("Thrifty")
        .controller("CartController", CartController);
    
    function CartController($location, UserService, $rootScope) {
        var vm = this;
        
        function init() {

            vm.user = $rootScope.currentUser;
            UserService.populateCart(vm.user._id)
                .then(function(response) {
                    console.log(response.data);
                    vm.cart = response.data.cart;
                    vm.total = 0;
                    for(var i = 0; i < vm.cart.length; i++) {
                        vm.total += vm.cart[i].price;
                    }
                },
                function(err) {
                    console.log(err.message);
                })
        }
        init();
        
    }
    
    
})();