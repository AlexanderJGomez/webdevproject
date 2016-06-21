(function(){
    angular
        .module("Thrifty")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var vm = this;

        vm.enter = enter;

        //GOTO a login/register page
        function enter() {
            $location.url("/login/");

        }
    }
})();