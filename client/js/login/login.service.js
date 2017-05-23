(function() {
  'use strict'

  angular.module('app')
    .service('loginService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.checkUserExists = checkUserExists
    sv.updateUser = updateUser
    sv.createUser = createUser
    sv.getUser = getUser

    function getUser(userID) {
      return $http.get(`/api/users/${userID}`).then(usr => usr.data ? usr.data : false)
    }

    function checkUserExists(user){
      return $http.get(`/api/users/${user.authResponse.userID}`).then(usr => usr.data ? usr.data : false)
    }

    function createUser(user){
      return $http.post('/api/users', user).then(usr => usr.data[0])
    }

    function updateUser(userData){
      return $http.patch(`/api/users/${userData.fbid}`, userData).then(usr => {
        return usr.data
      })
    }

  }
}())
