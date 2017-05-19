(function() {

  angular.module('app')
    .component('content', {
      controller: controller,
      templateUrl: './js/content/content.html'
    })

    controller.$inject = ['contentService']

    function controller(contentService){
      const vm = this
      vm.$onInit = onInit

      function onInit() {
        getUsers()

      }

      function getUsers() {
        contentService.getUsers().then(users => {
          vm.users = users
        })
      }
    }


}())
