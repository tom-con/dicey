(function() {
  'use strict'

  angular.module('app')
    .service('groupService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getGroup = getGroup
    sv.getMembers = getMembers

    function getGroup(id){
      return $http.get(`/api/groups/${id}`).then(group => group.data)
    }

    function getMembers(groupID){
      return $http.get(`/api/usersgroups/${groupID}`).then(userIDs => {
        return Promise.all(userIDs.data.map(user => $http.get(`/api/users/${user.user_fbid}`)
          .then(userData => userData.data)))
      })
    }

  }
}())
