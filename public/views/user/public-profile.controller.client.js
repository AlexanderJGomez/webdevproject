(function(){
    angular
        .module("Thrifty")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        console.log($rootScope.currentUser);

        function init() {
            vm.user = $rootScope.currentUser;
        }
        init();
    }
})();