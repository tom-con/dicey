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
      .state('home', {
        name: 'home',
        url: '/about',
        parent: 'layout',
        component: 'home'
      })
      .state('login', {
        name: 'login',
        url: '/',
        parent: 'layout',
        component: 'login'
      })
  }



}());
