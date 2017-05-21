(function() {

  angular.module('app')
    .component('new', {
      controller: controller,
      templateUrl: './js/new/new.html'
    })

    controller.$inject = ['newService', '$state', '$rootScope']

    function controller(newService, $state, $rootScope){
      const vm = this
      vm.$onInit = onInit

      function onInit() {
      }
    }

}())
