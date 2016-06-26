/**
 * Created by alexgomez on 6/25/16.
 */
(function() {
    angular.module("Thrifty")
        .factory("PurchaseService", PurchaseService)

    function PurchaseService($http) {
        var api = {
            populatePurchase: populatePurchase
        }
        return api;

        function populatePurchase(purchaseId) {
            var url = "/api/purchase/"+purchaseId;
            return $http.get(url);
        }

    }
})();