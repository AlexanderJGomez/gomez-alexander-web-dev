(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $rootScope, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logOut = logOut;
        vm.unregister = unregister;

        var id = $routeParams.id;
        var index = -1;
        function init() {
            // UserService
            //     .findUserById(id)
            //     .then(function(response) {
            //         vm.user = response.data;
            //     });
            vm.user = $rootScope.currentUser;
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.user._id, user)
                .then(function(response, error) {
                    if(error) {
                        vm.error = "User not found";
                    }
                    else {
                        vm.success = "User successfully updated";
                    }
                });

        }

        function unregister() {
            UserService
                .deleteUser(vm.user._id)
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                })
        }

        function logOut() {
            UserService
                .logOut()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    });
        }

    }
})();