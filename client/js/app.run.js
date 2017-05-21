  (function() {
  'use strict';

  angular.module('app').run(run);

  run.$inject = ['$rootScope', '$window', 'authService']

  function run($rootScope, $window, authService) {
    $rootScope.user = {};
    $window.fbAsyncInit = function() {
      FB.init({
        appId: '1876037599325617',
        channelUrl: 'js/login/channel.html',
        status: true,
        cookie: true,
        xfbml: true
      });
      authService.watchLoginChange();
    };

    (function(d) {
      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));
  }



}());
