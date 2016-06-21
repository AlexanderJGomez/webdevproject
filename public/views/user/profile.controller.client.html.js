(function(){
    angular
        .module("Thrifty")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        var id = $routeParams["userId"];

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        //var id = $routeParams["id"];
        var index = -1;

        function init() {
            vm.user = $rootScope.currentUser;
            // UserService
            //     .findUserById(id)
            //     .then(function(response) {
            //         vm.user = response.data;
            //     });
        }
        init();

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = error.data;
                    }
                );
        }

        //'update' invokes put request. to userservice
        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function() { //if successful or unsuccessful, nav to login page
                        $rootScope.currentUser = null; //user we were caching is no longer valid.
                        $location.url("/login");
                    },
                    function() {
                        $rootScope.currentUser = null; //user we were caching is no longer valid.
                        $location.url("/login");
                    }
                );
        }
    }
})();