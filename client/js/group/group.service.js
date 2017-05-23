(function() {
  'use strict'

  angular.module('app')
    .service('groupService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getGroup = getGroup

    function getGroup(id){
      return $http.get(`/api/groups/${id}`).then(group => group.data)
    }

  }
}())
