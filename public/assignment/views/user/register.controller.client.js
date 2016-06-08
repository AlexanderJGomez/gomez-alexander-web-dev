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
            if(!(user.password1 && user.password2 && user.username && user.password1 == user.password2) ) {
                vm.error = "Fill in fields correctly"
            }
            UserService.createUser(user)
                .then(function(response, err) {
                    if(response.data) {
                        $location.url("/profile/" + response.data._id)
                    }
                    else {
                        vm.error = "Error registering."
                    }
                })
        }
    }

})();