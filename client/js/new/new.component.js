(function() {

  angular.module('app')
    .component('new', {
      controller: controller,
      templateUrl: './js/new/new.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'authService', 'newService', '$scope']

  function controller(newService, $state, $rootScope, authService, newService, $scope) {
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
        Promise.all(res.map(person => authService.getUserInfo(person.id))).then(people => {
          $scope.$apply(function(){
            vm.showFriends = true
            vm.friendsList = [...people]
          })
        })
      })
    }

    function createGroup() {
      newService.addGroup(vm.form).then(group => {
        vm.form.people[group[0].owner_fbid] = true
        newService.addUsersGroup({
          people: vm.form.people,
          group_id: group[0].id
        }).then(groupArr => {
          $state.go('group.sentence', {sid: group[0].id})
        })
      })
    }
  }

}())
