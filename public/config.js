(function(){
    angular
        .module("Thrifty")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/item", {
                templateUrl: "views/item/item-list.view.client.html",
                controller: "ItemListController",
                controllerAs: "model"
            })
            /*
            .when("/user", { // from the fb stuff. could use this for other things to visit other peoples' profile. if you have the id, visit other person's profile- dont need to be logged in. if you dont have id goto own profile
=======
>>>>>>> 2d0ed7f897dfda53d4259cce1583ec865f6422b9
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(function(response) {
                        var user = response.data;
                        if(user == '0') {
                            deferred.reject()
                            $location.url("/login")
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        deferred.reject();
                    })

            deferred.promise;
        }
    }
})();