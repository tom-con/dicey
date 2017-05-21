(function() {

  angular.module('app')
    .component('login', {
      controller: controller,
      templateUrl: './js/login/login.html'
    })

    controller.$inject = ['loginService', 'authService', '$rootScope']

    function controller(loginService, authService, $rootScope){
      const vm = this
      vm.$onInit = onInit

      function onInit() {
        vm.user = $rootScope.user
        vm.authorized= $rootScope.authorized
        console.log(vm.user, vm.authorized);
      }

    }


}())
