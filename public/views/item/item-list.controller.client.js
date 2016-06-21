/**
 * Created by alexgomez on 6/21/16.
 */
(function(){
    angular
        .module("Thrifty")
        .controller("ItemListController", ItemListController);

    function ItemListController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        
        function init() {
            ItemService.findItemBySeller($rootScope._id)
                .then(function (response) {
                    console.log("In ILC");
                    vm.items = response.data;
                },
                function(err) {
                    console.log(err);
                })
        }
        init();
        
        
    }
})();