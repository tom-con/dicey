(function() {

  angular.module('app')
    .component('group', {
      controller: controller,
      bindings: {
        me: '<'
      },
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
        vm.group = group
        groupService.getMembers(id).then(members => {
          let membObj = {}
          members.forEach(mem => {membObj[mem.fbid] = mem})
          vm.group.members = membObj
        })
      })
    }
}

}())
