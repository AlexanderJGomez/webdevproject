(function(){
    angular
        .module("Thrifty")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, ItemService) {
        var vm = this;


        function init() {
            vm.user = $window.sessionStorage.currentUser;
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
                    console.log(response.data);
                    vm.items = response.data;
                },
                function(err) {
                    console.log(err.message);
                })
        }
    }
})();