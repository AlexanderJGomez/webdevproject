(function(){
    angular
        .module("Thrifty")
        .controller("ItemNewController", ItemNewController);

    function ItemNewController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        var id = $routeParams.itemId;

        vm.createItem = createItem;

        function createItem(item) {
            item.seller = $rootScope.currentUser._id;
            ItemService.createItem(item)
                .then(
                    function (response) {
                        console.log(response.data);
                        $location.url("/profile/listings");
                    },
                    function (err) {
                        vm.error = "Error creating item";
                    }
                );
        }
    }
})();