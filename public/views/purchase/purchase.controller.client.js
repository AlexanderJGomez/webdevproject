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