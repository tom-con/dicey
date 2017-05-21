(function() {

  angular.module('app')
    .component('content', {
      controller: controller,
      templateUrl: './js/content/content.html'
    })

    controller.$inject = ['contentService', '$state', '$rootScope']

    function controller(contentService, $state, $rootScope){
      const vm = this
      vm.$onInit = onInit

      function onInit() {
      }
    }


}())
