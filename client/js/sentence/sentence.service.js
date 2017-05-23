(function() {
  'use strict'

  angular.module('app')
    .service('sentenceService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this
    sv.getSentence = getSentence

    function getSentence(id){
      return $http.get(`/api/sentences/${id}`).then(group => group.data)
    }

  }
}())
