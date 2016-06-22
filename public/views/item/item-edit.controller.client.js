/**
 * Created by alexgomez on 6/21/16.
 */
(function(){
    angular
        .module("Thrifty")
        .controller("ItemEditController", ItemEditController);

    function ItemEditController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        var id = $routeParams.itemId;
        vm.updateItem = updateItem;
        vm.createItem = createItem;

        function init() {
            if(id) {
                ItemService.findItemById(id)
                    .then(function(response) {
                        vm.item = response.data;
                    })

            }
            else {
                vm.item = {};
            }
        }
        init();

        function createItem(item) {
            item.seller = $rootScope.currentUser._id;
            ItemService.createItem(item)
                .then(function(response) {
                    console.log(response.data);
                    $location.url("/profile/listings");
                },
                function(err) {
                    vm.error = "Error creating item";
                })
        }

        function updateItem(item) {
            ItemService.updateItem(id, item)
                .then(function(response) {
                    $location.url("/profile/listings");
                },
                function(err) {
                    vm.error = "error updating item"
                })
        }


    }
})();