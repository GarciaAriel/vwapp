
angular.module('starter.contactroutes', [])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_contact/sub-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

  
     .state('app.contact-detail', {
      url: '/contact/:contactId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_contact/contact-detail.html',
          controller: 'ContactDetailCtrl'
        }
      }
    })
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
