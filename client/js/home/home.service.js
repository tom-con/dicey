(function() {
  'use strict'

  angular.module('app')
    .service('homeService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getGroups = getGroups

    function getGroups(){
      console.log("get in the service");
      return $http.get(`/api/usersgroups`).then(groups => {
        return groups.data
      })
    }

  }
}())
