(function(){
    angular
        .module("Thrifty")
        .controller("ItemListController", ItemListController);

    function ItemListController($location, $window, $routeParams, ItemService) {
        var vm = this;
        
        function init() {
            ItemService.findItemsBySeller($window.sessionStorage.currentUser._id)
                .then(
                    function (response) {
                        vm.items = response.data;

                        // To display help text when users are selling no items (used in view in an ng-show)
                        if (vm.items.length == 0) {
                            vm.emptyItems = true;
                            // console.log(vm.emptyItems);
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