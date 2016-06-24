(function(){
    angular
        .module("Thrifty")
        .controller("ItemNewController", ItemNewController);

    function ItemNewController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        vm.item = {};
        vm.item.seller = $rootScope.currentUser._id;

        vm.createItem = createItem;

        function createItem(item) {
            ItemService.createItem(item)
                .then(
                    function (response) {
                        $location.url("/profile/listings");
                    },
                    function (err) {
                        vm.error = "Error creating item";
                    }
                );
        }
    }
})();