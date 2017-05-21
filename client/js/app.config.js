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
        url: '/home',
        parent: 'layout',
        component: 'home'
      })
      .state('new', {
        name: 'new',
        url: '/new',
        parent: 'layout',
        component: 'new'
      })
      .state('login', {
        name: 'login',
        url: '/',
        parent: 'layout',
        component: 'login'
      })
  }



}());
