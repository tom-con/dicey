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
              getMe(user.fbid)
            })
        } else {

        }
      });
    }

    function addPublish() {
      FB.login(function(response) {

      }, {
        scope: 'publish_actions'
      });
    }

    function friendsPermission() {
      return new Promise(function(resolve, reject) {
        FB.login(function(response) {
          response.error ? reject(response.error) : resolve(response)
        }, {
          scope: 'user_friends'
        });
      })
    }

    function getFriends() {
      return new Promise(function(resolve, reject) {
        FB.api('/1876037599325617', {
          "fields": "context.fields(friends_using_app)"
        }, function(res) {
          res.error ? reject(res.error) : resolve(res.context.friends_using_app.data)
        })
      })
    }

    function getMe(fbid) {
      let user = {};
      FB.api(`/${fbid}`, function(res) {
        user.fbid = res.id
        user.name = res.name
        getUserPicture(fbid).then(prof_pic => {
          user.prof_picture = prof_pic
          getUserPermissions(user)
        })
      })
    }

    function getUserInfo(fbid) {
      return new Promise(function(resolve, reject) {
        FB.api(`/${fbid}`, function(res) {
          let user = {};
          user.fbid = res.id
          user.name = res.name
          getUserPicture(fbid).then(prof_pic => {
            user.prof_picture = prof_pic
            loginService.updateUser(user).then(usr => {
              usr ? resolve(usr) : reject(usr)
            })
          })
        })
      })
    }

    function getUserPicture(fbid) {
      return new Promise(function(resolve, reject) {
        FB.api(
          `/${fbid}/picture`, function(res) {
            res.error ? reject(res) : resolve(res.data.url)
          })
      })
    }

    function getUserPermissions(user) {
      FB.api(`/${user.fbid}/permissions`, function(resp) {
        resp.data.forEach(thisPerm => thisPerm.status === 'granted' ? user[thisPerm.permission] = true : user[thisPerm.permission] = false)
        loginService.updateUser(user)
      })
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
