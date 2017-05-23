(function() {

  angular.module('app')
    .component('new', {
      controller: controller,
      templateUrl: './js/new/new.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'authService', 'newService']

  function controller(newService, $state, $rootScope, authService, newService) {
    const vm = this
    vm.$onInit = onInit
    vm.getFriends = getFriends
    vm.createGroup = createGroup
    vm.authFriends = authFriends
    vm.selected = ''

    function onInit() {
      vm.showFriends = false
      vm.showForm = false
      vm.addedFriends = []
      vm.selected = {}
    }

    function authFriends() {
      vm.showForm = true
      authService.friendsPermission().then(() => {
        vm.getFriends()
      })
    }

    function getFriends() {
      vm.form = {
        name: '',
        word_limit: 0,
        people: {}
      }
      authService.getFriends().then(res => {
        vm.friendsList = res
        vm.showFriends = true
      })
    }

    function createGroup() {
      newService.addGroup(vm.form).then(group => {
        vm.form.people[group[0].owner] = true
        newService.addUsersGroup({
          people: vm.form.people,
          group_id: group[0].id
        }).then(groupArr => {
          $state.go('home')
        })
      })
    }
  }

}())
