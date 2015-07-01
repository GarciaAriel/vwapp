angular.module('starter.scheduleroutes', ['starter.schedulecontrollers','starter.constantsSchedule'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  // ROUTE EDIT APPOINTMENT
  .state('app.schedulerEdit', {
    url: "/schedulerEdit",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/newAppointment.html",
        controller: "ControllerScheduleEdit"
      }
    }
  })

  // ROUTE NEW APPOINTMENT
  .state('app.newAppointment', {
    url: "/newAppointment",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/newAppointment.html",
        controller: "NewAppointmentController"
      }
    }
  })
  
  // ROUTE VIEW CALENDAR
  .state('app.schedulerView', {
    url: "/schedulerView",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/schedulerView.html",
        controller: "ControlSchedule"
      }
    }
  })
  
  // ROUTE DETAIL APPOINTMENT
  .state('app.schedulerDetail', {
    url: "/schedulerDetail?appointmentId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/appointmentDetail.html",
        controller: "ControlScheduleDetail"
      }
    }
  })

  // ROUTE TO ADD PARTICIPANTS TO AN APPOINTMENT
  .state('app.addParticipantsToAnAppointment', {
    url: "/addParticipants",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/addParticipantsToAnAppointment.html",
        controller: "addParticipantsToAnAppointment"
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});