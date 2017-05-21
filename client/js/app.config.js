(function() {
  'use strict';

  angular.module('app').config(config)

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
        url: '/about',
        parent: 'layout',
        component: 'content'
      })
      .state('login', {
        name: 'login',
        url: '/',
        parent: 'layout',
        component: 'login'
      })
  }



}());
