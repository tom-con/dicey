(function() {

  angular.module('app')
    .component('new', {
      controller: controller,
      templateUrl: './js/new/new.html'
    })

    controller.$inject = ['newService', '$state', '$rootScope', 'authService']

    function controller(newService, $state, $rootScope, authService){
      const vm = this
      vm.$onInit = onInit
      vm.getFriends = getFriends

      function onInit() {
        $('select').material_select();
      }

      function getFriends(){
        authService.getFriends()
      }
    }


}())
