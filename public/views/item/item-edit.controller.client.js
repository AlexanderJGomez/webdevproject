(function(){
    angular
        .module("Thrifty")
        .controller("ItemEditController", ItemEditController);

    function ItemEditController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        var id = $routeParams.itemId;
        vm.updateItem = updateItem;
        vm.deleteItem = deleteItem;

        function init() {
            if(id) {
                ItemService.findItemById(id)
                    .then(
                        function(response) {
                            if(response.data.seller._id == $rootScope.currentUser._id) {
                                vm.item = response.data;
                            }
                            else {
                                $location.url("/home");
                            }

                        });

            } else {
                vm.item = {};
            }
        }
        init();


        function updateItem(item) {
            if (item.name && item.description && item.price) {
                ItemService.updateItem(id, item)
                    .then(
                        function (response) {
                            $location.url("/profile/listings");
                        },
                        function (err) {
                            vm.error = "error updating item"
                        }
                    );
            } else {
                vm.error = "Please fill out all fields"
            }
        }

        function deleteItem() {
            // console.log("deleteitem");
            ItemService.deleteItem(id)
                .then(
                    function(response) {
                        $location.url("/profile/listings");
                    },
                    function(error) {
                        vm.error= "Unable to delete Item"
                    }
                );
        }
    }
})();