(function() {

  angular.module('app')
    .component('layout', {
      controller: controller,
      templateUrl: './js/layout/layout.html'
    })

    controller.$inject = ['loginService']
    function controller(loginService){
      const vm = this
      vm.$onInit = onInit
      vm.getMe = getMe

      function onInit(){
        $(".button-collapse").sideNav();
        vm.getMe()
      }
      function getMe(){
        loginService.getMe().then(me => {
          vm.me = me
        })
      }


    }

}())
