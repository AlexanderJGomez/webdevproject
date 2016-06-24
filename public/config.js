(function(){
    angular
        .module("Thrifty")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
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
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/profile/listings", {
                templateUrl: "views/item/item-list.view.client.html",
                controller: "ItemListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/item/new", {
                templateUrl: "views/item/item-new.view.client.html",
                controller: "ItemNewController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/item/:itemId", {
                templateUrl: "views/item/item-edit.view.client.html",
                controller: "ItemEditController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/item/:itemId/view", {
                templateUrl: "views/item/item-view.view.client.html",
                controller: "ItemViewController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $q, $location, $window) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(function(response) {
                        var user = response.data;
                        if(JSON.parse($window.localStorage.getItem("currentUser"))) {
                            deferred.resolve()
                        }
                        else if(user == '0') {
                            console.log("Couldn't find user")
                            deferred.reject();
                            $location.url("/home");
                        }
                        else {
                            $window.localStorage.setItem('currentUser', angular.toJson(user));
                            console.log(JSON.parse($window.localStorage.getItem("currentUser")));
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