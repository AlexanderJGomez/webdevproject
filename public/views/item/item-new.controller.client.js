(function(){
    angular
        .module("Thrifty")
        .controller("ItemNewController", ItemNewController);

    function ItemNewController($location, $window, $routeParams, ItemService) {
        var vm = this;
        vm.item = {};
        vm.item.seller = $window.sessionStorage.currentUser._id;

        vm.createItem = createItem;

        function createItem(item) {
            item.seller = $window.sessionStorage.currentUser._id;
            ItemService.createItem(item)
                .then(
                    function (response) {
                        // console.log(response.data);
                        $location.url("/profile/listings");
                    },
                    function (err) {
                        vm.error = "Error creating item";
                    }
                );
        }
    }
})();