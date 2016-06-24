(function(){
    angular
        .module("Thrifty")
        .controller("ItemNewController", ItemNewController);

    function ItemNewController($location, $window, $routeParams, ItemService) {
        var vm = this;
        vm.item = {};
        vm.item.seller = JSON.parse($window.localStorage.getItem('currentUser'))._id;

        vm.createItem = createItem;

        function createItem(item) {
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