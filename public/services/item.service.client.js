/**
 * Created by alexgomez on 6/21/16.
 */
(function () {
    angular
        .module("Thrifty")
        .factory("ItemService", ItemService);

    function ItemService($http) {

        var api = {
            createItem: createItem,
            findItemsBySeller: findItemsBySeller,
            findItemById: findItemById,
            updateItem: updateItem,
            deleteItem: deleteItem
        };
        return api;

        function createItem(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findItemsBySeller(id) {
            var url = "/api/user/" + id + "/listings";
            return $http.get(url);
        }
        
        function findItemById(id) {
            // console.log("item service client");
            // console.log(id);
            var url = "/api/item/" + id;
            return $http.get(url);
        }

        function updateItem(id, newItem) {
            var url = "/api/item/" + id;
            return $http.put(url, newItem);
        }

        function deleteItem(id) {
            var url = "/api/item/" + id;
            return $http.delete(url);
        }
    }
})();