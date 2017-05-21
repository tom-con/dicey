(function() {
  'use strict';

  angular.module('app').config(config).run(['$rootScope', '$window', 'authService',
    function($rootScope, $window, authService) {

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
  ]);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    $stateProvider
      .state('layout', {
        name: 'layout',
        abstract: true,
        component: 'layout',
      })
      .state('content', {
        name: 'content',
        url: '/',
        parent: 'layout',
        component: 'content'
      })
      .state('login', {
        name: 'login',
        url: '/login',
        parent: 'layout',
        component: 'login'
      })

  }



}());
