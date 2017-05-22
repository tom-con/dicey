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
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
          loginService.checkUserExists(res)
            .then(user => user ? user : loginService.createUser(res))
            .then(user => {
              // THIS IS WHERE WE SHOULD CREATE THE TOKEN???? <-------OPTION A
              getUserInfo(user.id)
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

    function getFriends() {
      FB.login(function(response) {
        console.log(response);
      }, {
        scope: 'user_friends'
      });
    }

    function getUserInfo(id) {
      var _self = this;
      FB.api('/me', function(res) {
        loginService.updateUser(id, res).then(user => {
          // THIS IS WHERE WE SHOULD CREATE THE TOKEN???? <-------OPTION B
          $state.go('home')
        })
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
