(function() {
  'use strict'

  angular.module('app')
    .service('homeService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getUsers = getUsers

    function getUsers(){
      return $http.get('/api/users').then(users => {
        return users.data
      })
    }
  }
}())
