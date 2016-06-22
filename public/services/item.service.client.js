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

        function updateItem(id, newItem) {
            var url = "/api/item/"+id;
            return $http.put(url, newItem);
        }

        function findItemsBySeller(id) {
            var url = "/api/user/" + id + "/listings";
            return $http.get(url);
        }

        function createItem(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        function deleteItem(id) {
            var url = "/api/user/"+id;
            return $http.delete(url);
        }
        function findItemById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
    }
})();