/**
 * Created by alexgomez on 6/25/16.
 */
(function() {
    angular.module("Thrifty")
        .controller("PurchaseListController", PurchaseListController);

    function PurchaseListController($rootScope, UserService) {
        var vm = this;

        function init() {
            vm.user = $rootScope.currentUser;
            UserService.getPurchases(vm.user._id)
                .then(function (response) {
                    console.log(response.data);
                    vm.purchases = response.data;
                },
                function(err) {
                    console.log(err.message);
                })
        }
        init();
    }
})();