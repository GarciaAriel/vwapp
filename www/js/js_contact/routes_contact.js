
angular.module('starter.contactroutes', ['starter.contactList','starter.contactDetail','starter.contactDetailMember'])


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider.state('app.contacts', {
    url: '/contacts',
    cache: true,
    views: {
      'menuContent': {
       controller: 'memberList',
       templateUrl: 'templates/views_contact/contactslist.html'
      }
    }
  })

  $stateProvider.state('app.search', {
    url: '/parameter(contactSearchName)',
  }) 

  $stateProvider.state('app.contactPerson', {
    url: "/contactPerson?contactId&addressId&contactPersonId&addressType",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/contactPerson.html",
        controller: 'memberDetail'
      }
    }
  })

  $stateProvider.state('app.memberDetail', {
    url: "/memberDetail?contactId&addressId&contactPersonId&addressType",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/contactPerson.html",
        controller: 'contactDatailMember'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
