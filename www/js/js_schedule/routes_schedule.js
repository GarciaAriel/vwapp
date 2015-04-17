angular.module('starter.scheduleroutes', ['starter.schedulecontrollers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('app.schedulerDay', {
    url: "/schedulerDay",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler_day.html",
        controller: "ControlSchedule"
      }
    }
  })
  
  .state('app.schedulerDetail', {
    url: "/schedulerDetail",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/appointmentDetail.html",
        controller: "ControlSchedule"
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});