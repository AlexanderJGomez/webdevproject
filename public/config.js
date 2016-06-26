(function(){
    angular
        .module("Thrifty")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {loggedin: validateUser}
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
                resolve: {loggedin: validateUser}
            })
            .when("/profile/cart", {
                templateUrl: "views/item/cart.view.client.html",
                controller: "CartController",
                controllerAs: "model",
                resolve: {loggedin : checkLoggedIn}
            })
            .when("/profile/purchases", {
                templateUrl: "views/purchase/purchase-list.view.client.html",
                controller:"PurchaseListController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/profile/purchases/:purchaseId", {
                templateUrl: "views/purchase/purchase.view.client.html",
                controller:"PurchaseController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedIn}
            })
            .when("/user/:userId", {
                templateUrl: "views/user/public-profile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: 'model'
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
                            console.log("Couldn't find user")
                            deferred.reject();
                            $location.url("/home");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        deferred.reject();
                    });

            deferred.promise;
        }

        function validateUser(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLoggedIn()
                .then(function(response) {
                        var user = response.data;
                        if(user == '0') {
                            console.log("user == 0, resolving");
                            deferred.resolve();
                            // $location.url("/home");
                        }
                        else {
                            console.log("user logged in, resolving");
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        deferred.reject();
                    });

            deferred.promise;
        }
    }
})();