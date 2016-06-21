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
            .when("/user/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("#/user/:userId/item", {
                templateUrl: "views/item/item-list.view.client.html",
                controller: "ItemListController",
                controllerAs: "model"
            })
            /*
            .when("/user", { // from the fb stuff. could use this for other things to visit other peoples' profile. if you have the id, visit other person's profile- dont need to be logged in. if you dont have id goto own profile
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin } //conditions by which you will be allowed to go to this page
            })
            .when("/user/:userId", { //want to protect this page.
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin } //conditions by which you will be allowed to go to this page
            })*/
            .otherwise({
                redirectTo: "/home"
            });
    }
})();