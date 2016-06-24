(function(){
    angular
        .module("Thrifty")
        .controller("ItemViewController", ItemViewController);

    function ItemViewController($location, $rootScope, $routeParams, ItemService) {
        var vm = this;
        var id = $routeParams.itemId;
        // vm.updateItem = updateItem;
        
        
        
        function init() {
            if(id) {
                ItemService.findItemById(id)
                    .then(function(response) {
                        vm.item = response.data;
                    })

            } else {
                vm.item = {};
            }
            
            vm.user = $rootScope.currentUser;
            
            // get seller


        }
        init();

        // function updateItem(item) {
        //     // console.log(item);
        //     ItemService.updateItem(id, item)
        //         .then(
        //             function(response) {
        //                 $location.url("/profile/listings");
        //             },
        //             function(err) {
        //                 vm.error = "error updating item"
        //             }
        //         );
        // }
    }
})();