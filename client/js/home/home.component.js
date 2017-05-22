(function() {

  angular.module('app')
    .component('home', {
      controller: controller,
      templateUrl: './js/home/home.html'
    })

    controller.$inject = ['homeService', '$state', '$rootScope']

    function controller(homeService, $state, $rootScope){
      const vm = this
      vm.$onInit = onInit

      function onInit() {
        homeService.getGroups().then(groups => {
          vm.groups = groups
        })
      }
    }

}())
