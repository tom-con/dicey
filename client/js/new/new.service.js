(function() {
  'use strict'

  angular.module('app')
    .service('newService', service)

  service.$inject = ['$http']

  function service($http) {
    const sv = this
    sv.addGroup = addGroup
    sv.addUsersGroup = addUsersGroup

    function addGroup(data) {
      return $http.post('/api/groups', {
        name: data.name,
        word_limit: data.word_limit
      }).then(group => group.data)
    }

    function addUsersGroup(data) {

      let peopleArr = []
      for(let person in data.people) {
        peopleArr.push(person)
      }
      return Promise.all(peopleArr.map(person => $http.post('/api/usersgroups', {
        user_fbid: person,
        group_id: data.group_id
      }).then(datum => datum.data)))
    }
  }
}())
