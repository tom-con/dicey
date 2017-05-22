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
    vm.addFriend = addFriend
    vm.createGroup = createGroup
    vm.selected = ''

    function onInit() {
      authService.friendsPermission()
      vm.showFriends = false
      vm.addedFriends = []
      vm.selected = {}
      vm.getFriends()
    }

    function getFriends() {
      vm.form = {
        name: '',
        word_limit: 0,
        people: {}
      }
      authService.getFriends().then(res => {
        vm.friendsList = res
      })
    }


    function addFriend(id) {

    }

    function createGroup() {
      newService.addGroup(vm.form).then(group => {
        console.log(group);
        vm.form.people[group[0].owner]=true
        newService.addUsersGroup({people: vm.form.people, group_id: group[0].id}).then(groupArr => {
          console.log(groupArr);
        })
      })
    }
  }


}())
