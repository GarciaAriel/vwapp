angular.module('starter.scheduleroutes', [])




.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('app.schedulerDay', {
    url: "/schedulerDay",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler_day.html"
      }
    }
  })

  .state('app.schedulerWeek', {
    url: "/schedulerWeek",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler_week.html"
      }
    }
  })

  .state('app.schedulerMonth', {
    url: "/schedulerMonth",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler_month.html"
      }
    }
  })

  .state('app.schedulerYear', {
    url: "/schedulerYear",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler_year.html"
      }
    }
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
