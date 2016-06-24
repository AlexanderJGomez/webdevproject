(function(){
    angular
        .module("Thrifty")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $window, $routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.addToBalance = addToBalance;

        console.log(JSON.parse($window.localStorage.getItem("currentUser")));


        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"))
        }
        init();

        function unregister() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function(response) {
                        $window.localStorage.setItem('currentUser', null);
                        $location.url("/home");
                    },
                    function(error){
                        vm.error = error.data;
                    }
                );
        }
        
        function updateUser() {
            // console.log("update user");
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

        function addToBalance() {
            if(vm.deposit > 0) {
                vm.user.balance += vm.deposit;
                UserService.updateUser(vm.user._id, vm.user)
                    .then(function(response) {
                        console.log("new user has balance of " + response.data.balance);
                        $location.url("/profile");
                    },
                    function(err) {
                        console.log(err.message);
                    })

            }
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function() {
                        $window.localStorage.setItem('currentUser', null);
                        $location.url("/home");
                    },
                    function() {
                        $window.localStorage.setItem('currentUser', null);
                        $location.url("/home");
                    }
                );
        }
    }
})();