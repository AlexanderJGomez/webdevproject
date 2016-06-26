(function(){
    angular
        .module("Thrifty")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.userId;
        console.log("In here kid");

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    console.log(response.data);
                    vm.seller = response.data;
                })
        }
        init();
    }
})();