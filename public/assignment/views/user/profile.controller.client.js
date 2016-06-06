(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;
        var index = -1;
        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
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
    }
})();