(function() {
  'use strict'

  angular.module('app')
    .service('newService', service)

  service.$inject = ['$http']
  function service($http) {
    const sv = this

  }
}())
