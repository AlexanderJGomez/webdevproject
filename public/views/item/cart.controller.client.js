(function() {
    angular.module("Thrifty")
        .controller("CartController", CartController);
    
    function CartController($location, UserService, $rootScope) {
        var vm = this;
        vm.removeFromCart = removeFromCart;
        vm.purchase = purchase;
        
        function init() {

            vm.user = $rootScope.currentUser;
            UserService.populateCart(vm.user._id)
                .then(function(response) {
                    console.log(response.data);
                    vm.cart = response.data.cart;
                    console.log(vm.cart);
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

        function removeFromCart(itemId) {
            UserService.removeFromCart(vm.user._id, itemId)
                .then(function(response) {
                    console.log("removed item");
                    for(var i = 0; i < vm.cart.length; i++) {
                        if(vm.cart[i]._id = itemId) {
                            vm.total -= vm.cart[i].price;
                            vm.cart.splice(i, 1);
                        }
                    }
                    $rootScope.currentUser = response.data;
                    $location.url("/profile/cart")
                },
                function(err) {
                    console.log(err.message);
                })
        }

        function purchase() {
            if(vm.total > vm.user.balance) {
                vm.error = "Insufficient Funds";
            }
            else {
                vm.error = null;
                UserService.purchase(vm.user._id, vm.user.cart)
                    .then(function(response) {
                        $rootScope.currentUser.cart = [];
                        console.log("purchase complete")
                        $location.url("/profile/purchases")
                    })
            }
        }
        
    }
    
    
})();