/**
 * Created by alexgomez on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($routeParams, UserService, $location) {
        var vm = this;

        vm.register = register;

        function register(user) {
            console.log("inside register");
            var result = UserService.createUser(user);
            if(result) {
                var x = UserService.findUserByUsername(user.username);
                $location.url("/profile/" + x._id)
            }
            else {
                vm.error = "Error registering."
            }
        }
    }

})();