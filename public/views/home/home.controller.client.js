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
                        vm.allItems = response.data;
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
            ItemService.search(param)
                .then(function(response) {
                    vm.items = response.data;
                    
                    if (vm.items.length == 0) {
                        vm.emptyItems = true;
                    }
                },
                function(err) {
                    console.log(err.message);
                })
        }
    }
})();