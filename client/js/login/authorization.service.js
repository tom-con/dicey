(function() {
  'use strict'

  angular.module('app')
    .service('authService', service)

  service.$inject = ['$http', '$rootScope', 'loginService']

  function service($http, $rootScope, loginService) {
    const sv = this
    sv.watchLoginChange = watchLoginChange
    sv.getUserInfo = getUserInfo
    sv.logIn = logIn

    function watchLoginChange() {
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          loginService.checkUser(res).then(user => {
            _self.getUserInfo(user.id);
          })
        } else {

        }
      });
    }

    function logIn() {
      FB.login(function(response) {
        console.log(response);
      }, {
        scope: 'publish_actions'
      });
    }

    function getUserInfo(id) {
      var _self = this;
      FB.api('/me', function(res) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = res;
          loginService.updateUser(id, res).then(user => {
            console.log(user);
          })
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
