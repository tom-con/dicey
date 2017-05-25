(function() {
  'use strict'

  angular.module('app')
    .service('homeService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getGroups = getGroups

    function getGroups(){
      return $http.get(`/api/usersgroups`).then(groups => groups.data)
    }

  }
}())
