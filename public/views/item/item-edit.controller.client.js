(function(){
    angular
        .module("Thrifty")
        .controller("ItemEditController", ItemEditController);

    function ItemEditController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        var id = $routeParams.itemId;
        vm.updateItem = updateItem;
        vm.deleteItem = deleteItem;
        // vm.createItem = createItem;

        function init() {
            // console.log(id);
            if(id) {
                ItemService.findItemById(id)
                    .then(function(response) {
                        vm.item = response.data;
                    })

            } else {
                vm.item = {};
            }
        }
        init();

        // function createItem(item) {
        //     item.seller = $rootScope.currentUser._id;
        //     ItemService.createItem(item)
        //         .then(
        //             function(response) {
        //                 console.log(response.data);
        //                 $location.url("/profile/listings");
        //             },
        //             function(err) {
        //                 vm.error = "Error creating item";
        //             }
        //         );
        // }

        function updateItem(item) {
            // console.log(item);
            ItemService.updateItem(id, item)
                .then(
                    function(response) {
                        $location.url("/profile/listings");
                    },
                    function(err) {
                        vm.error = "error updating item"
                    }
                );
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