
angular.module('starter.contactroutes', ['starter.contactcontrollers'])


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider.state('app.contacts', {
    url: '/contacts',
    cache: true,
    views: {
     'menuContent': {
       controller: 'ContactsCtrl',
       templateUrl: 'templates/views_contact/contactslist.html'
     }
   }


    })
  
  
  
  
  $stateProvider.state('app.search', {
                url: '/parameter(contactSearchName)',

            })





  

$stateProvider.state('app.contact', {
  url: "/contact?contactId&addressId&contactPersonId&addressType",
  views: {
    'menuContent': {
      templateUrl: "templates/views_contact/contact.html",
      controller: 'ContactCtrl'
    }
  }
});


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
