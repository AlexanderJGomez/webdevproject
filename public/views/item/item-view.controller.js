(function(){
    angular
        .module("Thrifty")
        .controller("ItemViewController", ItemViewController);

    function ItemViewController($location, $rootScope, $routeParams, ItemService, UserService) {
        var vm = this;
        var id = $routeParams.itemId;
        vm.addToCart = addToCart;

        
        function init() {
            if(id) {
                ItemService.findItemById(id)
                    .then(function(response) {
                        vm.item = response.data;

                    })
            } else {
                vm.item = {};
            }
            
            vm.user = $rootScope.currentUser;

        }
        init();

        function addToCart() {
            UserService.addToCart($rootScope.currentUser._id, vm.item._id)
                .then(function(response) {
                    console.log(response.data);
                    $location.url("/profile/cart");
                },
                function(err) {
                    console.log(err.message);
                })
        }
    }
})();