/**
 * Created by alexgomez on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.user = {};

        vm.register = register;

        function register(user) {
            if(!(user.password && user.password2 && user.username && user.password == user.password2) ) {
                vm.error = "Fill in fields correctly"
            }
            else {
                UserService.register(user.username, user.password)
                    .then(function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/profile/" + response.data._id)

                    },
                    function(err) {
                        vm.error = err.data;
                    })
            }
        }
    }

})();