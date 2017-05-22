(function() {

  angular.module('app')
    .component('layout', {
      controller: controller,
      templateUrl: './js/layout/layout.html'
    })

    function controller(){
      const vm = this
      vm.$onInit = onInit

      function onInit(){
        $(".button-collapse").sideNav();
      }
    }

}())
