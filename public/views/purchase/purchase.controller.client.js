/**
 * Created by alexgomez on 6/25/16.
 */
(function() {
   angular.module("Thrifty")
       .controller("PurchaseController", PurchaseController);

    function PurchaseController($location, $rootScope, PurchaseService, $routeParams) {
        var vm = this;
        var purchaseId = $routeParams.purchaseId;

        function init() {
            vm.user = $rootScope.currentUser;
            PurchaseService.populatePurchase(purchaseId)
                .then(function(response) {
                    console.log("SUP")
                    if(response.data.user == vm.user._id) {
                        vm.purchase = response.data;
                        vm.total = 0;
                        for(var i = 0; i < vm.purchase.items.length; i++) {
                            vm.total += vm.purchase.items[i].price;
                        }
                        console.log("HEY")
                    }
                    else {
                        $location.url("/home")
                    }
                })
            
        }

        init();


    }
})()