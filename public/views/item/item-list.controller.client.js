(function(){
    angular
        .module("Thrifty")
        .controller("ItemListController", ItemListController);

    function ItemListController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        
        function init() {
            ItemService.findItemsBySeller($rootScope.currentUser._id)
                .then(
                    function (response) {
                        vm.items = response.data;

                        if (vm.items.length == 0) {
                            vm.emptyItems = true;
                        }
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
        init();
        
        
    }
})();