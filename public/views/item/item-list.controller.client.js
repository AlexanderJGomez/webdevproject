(function(){
    angular
        .module("Thrifty")
        .controller("ItemListController", ItemListController);

    function ItemListController($location, $rootScope, $routeParams, ItemService, $filter) {
        var vm = this;
        
        function init() {

            ItemService.findItemsBySeller($rootScope.currentUser._id)
                .then(
                    function (response) {
                        vm.items = response.data;

                        $filter('date')(vm.items.dateAdded);

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