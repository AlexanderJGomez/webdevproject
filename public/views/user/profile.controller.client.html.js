(function(){
    angular
        .module("Thrifty")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        // var id = $routeParams["userId"];

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        //var id = $routeParams["id"];
        var index = -1;

        function init() {
            vm.user = $rootScope.currentUser;
        }
        init();

        function unregister() {
            console.log(vm.user._id);
            UserService
                .deleteUser(vm.user._id)
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
                .updateUser(vm.user._id, vm.user)
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
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    },
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    }
                );
        }
    }
})();