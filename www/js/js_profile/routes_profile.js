
angular.module('starter.profileRoutes', ['starter.profileDetail','starter.changePassword','starter.information'])


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app.profile', {
    url: "/profile?contactId&addressId&contactPersonId&name1&name2",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_profile/profile.html",
        controller: 'profile'
      }
    }
  })

  
  $stateProvider.state('app.information', {
    url: "/information",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_profile/information.html",
        controller: 'information_controller'
      }
    }
  })

  $stateProvider.state('app.changePassword', {
    url: "/changePassword",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_profile/changePassword.html",
        controller: 'changePassword'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
