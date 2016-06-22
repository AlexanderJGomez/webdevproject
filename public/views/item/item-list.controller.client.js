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
            console.log($rootScope.currentUser._id);
            ItemService.findItemsBySeller($rootScope.currentUser._id)
                .then(function (response) {
                    console.log("In ILC");
                    vm.items = response.data;
                    console.log(vm.items);

                    // To display help text when users are selling no items (used in view in an ng-show)
                    if (vm.items.length == 0) {
                        vm.emptyItems = true;
                        console.log(vm.emptyItems);
                    }
                },
                function(err) {
                    console.log(err);
                })
        }
        init();
        
        
    }
})();