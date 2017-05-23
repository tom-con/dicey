(function() {

  angular.module('app')
    .component('group', {
      controller: controller,
      templateUrl: './js/group/group.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'groupService']

  function controller(newService, $state, $rootScope, groupService) {
    const vm = this
    vm.$onInit = onInit

    function onInit() {
      getGroup($state.params.sid)
    }

    function getGroup(id) {
      groupService.getGroup(id).then(group => {
        console.log(group);
        vm.group = group
      })
    }
}

}())
