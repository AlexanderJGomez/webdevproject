(function(){
    angular
        .module("Thrifty")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, ItemService) {
        var vm = this;


        function init() {
            vm.user = $rootScope.currentUser;

            ItemService
                .getItems()
                .then(
                    function(response) {
                        vm.allItems = [];
                        for(var i = 0; i < response.data.length; i++) {
                            if(!response.data[i].purchased) {
                                vm.allItems.push(response.data[i]);
                            }
                        }
                        vm.numItems = vm.allItems.length;
                    },
                    function(err) {
                        console.log(err.message);
                    }
                );
        }
        init();
        vm.enter = enter;
        vm.search = search;

        function enter() {
            $location.url("/login/");
        }

        function search() {
            var param = vm.searchParam;
            if (param) {
                ItemService.search(param)
                    .then(
                        function(response) {
                            vm.items = [];
                            for(var i = 0; i < response.data.length; i++) {
                                if(!response.data[i].purchased) {
                                    vm.items.push(response.data[i]);
                                }
                            }
                            vm.numItems = vm.items.length;
                        },
                        function(err) {
                            console.log(err.data);
                        });
            }
        }
    }
})();