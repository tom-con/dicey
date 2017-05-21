(function() {
  'use strict'

  angular.module('app')
    .service('loginService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.logIn = logIn
    sv.checkUser = checkUser
    sv.updateUser = updateUser

    function logIn(data) {
      // $http.post('/api/users', )
    }

    function checkUser(user){
      return $http.post('/api/users', user).then(usr => {
        return usr.data
      })
    }

    function updateUser(id, data){
      return $http.patch(`/api/users/${id}`, data).then(usr => {
        return usr.data
      })
    }

  }
}())
