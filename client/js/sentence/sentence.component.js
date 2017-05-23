(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope']

  function controller(newService, $state, $rootScope) {
    const vm = this
    vm.$onInit = onInit

    function onInit() {

    }
}

}())
