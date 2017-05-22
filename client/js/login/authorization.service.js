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
    sv.getFriends = getFriends
    sv.friendsPermission = friendsPermission

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

    function friendsPermission() {
      FB.login(function(response) {}, {
        scope: 'user_friends'
      });
    }

    function getFriends() {
      return new Promise(function (resolve, reject) {
        FB.api('/1876037599325617', {
          "fields": "context.fields(friends_using_app)"
        }, function(res) {
          if (res.error) {
            reject(res.error)
          }
          else {
            resolve(res.context.friends_using_app.data)
          }
        })
      })
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
