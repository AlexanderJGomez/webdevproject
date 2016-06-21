(function(){
    angular
        .module("Thrifty")
        .controller("LoginController", LoginController);

    //UserService needs to be injected. doesn't exist yet
    function LoginController($location, $rootScope, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            
            // new with Login
            UserService
                .login(username, password)
                .then(
                    function(response) {
                        var user = response.data;

                        if (user) {
                            $rootScope.currentUser = user; //
                            var id = user._id;
                            $location.url("/user/" + id);
                        } else { // hopefully a temporary fix
                            vm.error = "User not found";

                        }
                    },// UserService never responds with an error, always going into the function(response) above
                    function(error) {
                        vm.error = "User not found";
                    }

                );
        }
    }
})();

/*
 function login(username, password) {

 UserService
 .findUserByUsernameAndPassword(username, password)
 //promises can handle successful response and error responses. (400 and above are errors)
 .then(
 function(response) {//server will come back and give a response back
 console.log(response);
 var user = response.data;

 if (user) {
 var id = user._id;
 $location.url("/user/" + id);
 }
 },
 function (error) {
 vm.error = error.data;

 //vm.error = "User not found";
 //vm.error = error;
 }
 );

 /*var user = UserService.findUserByUsernameAndPassword(username, password);
 if (user) {
 var id = user._id;
 $location.url("/user/" + id);
 } else {
 vm.error = "User not found";
 }
 }*/