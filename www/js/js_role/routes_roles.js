// Ionic Starter App
    // var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter.rolesroutes', ['starter.rolescontrollers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
  })

  .state('log-out',{
      url: '/log-out',
      templateUrl: 'templates/login.html',
      controller: 'logoutController'
  })

  
  .state('app.dos', {
    url: '/dos',
    views: {
      'menuContent': {
        templateUrl: 'templates/startPage.html',
        controller: 'dos'
      }
    }
  })

  .state('app', {
    url: "/app",
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
