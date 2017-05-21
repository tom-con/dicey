(function() {
  'use strict'

  angular.module('app')
    .service('authService', service)

  service.$inject = ['$http', '$rootScope']

  function service($http, $rootScope) {
    const sv = this
    sv.watchLoginChange = watchLoginChange
    sv.getUserInfo = getUserInfo

    function watchLoginChange() {
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          _self.getUserInfo();
        } else {
          $rootScope.authorized = true;
        }
      });
    }

    function getUserInfo() {
      var _self = this;
      FB.api('/me', function(res) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = res;
          $rootScope.authorized = true;
        });
      });
    }

    function logout() {
      var _self = this;
      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
        });
      });
    }
  }
}())
