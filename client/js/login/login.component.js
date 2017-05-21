(function() {

  angular.module('app')
    .component('login', {
      controller: controller,
      templateUrl: './js/login/login.html'
    })

    controller.$inject = ['loginService', 'authService']

    function controller(loginService, authService){
      const vm = this
      vm.$onInit = onInit
      vm.logIn = logIn

      function logIn() {
        authService.logIn()
      }

      function onInit() {

      }

    }


}())
