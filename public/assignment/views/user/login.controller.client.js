(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {

        var vm = this;

        vm.login = login;

        function login (username, password) {
            if(!username || !password) {
                vm.error = "Please fill out both fields";
            }
            else {
                UserService
                    .login(username, password)
                    .then(function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/profile/" + user._id);
                            } else {
                                vm.error = "User not found";
                            }
                        }
                        ,
                        function (err) {
                            vm.error = "Could not find user"
                        });
            }
        }
    }
})();