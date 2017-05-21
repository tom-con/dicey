(function() {
  'use strict'

  angular.module('app')
    .service('authService', service)

  service.$inject = ['$http', '$rootScope', 'loginService', '$state']

  function service($http, $rootScope, loginService, $state) {
    const sv = this
    sv.watchLoginChange = watchLoginChange
    sv.getUserInfo = getUserInfo
    sv.addPublish = addPublish

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

    function addPublish() {
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
            $state.go('home')
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
