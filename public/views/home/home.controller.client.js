(function(){
    angular
        .module("Thrifty")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope) {
        var vm = this;
        vm.user = $rootScope.currentUser;

        console.log(vm.user);

        vm.enter = enter;

        function enter() {
            $location.url("/login/");
        }
    }
})();