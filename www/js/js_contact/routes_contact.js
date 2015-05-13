
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

  $stateProvider.state('app.contactsCadeco', {
    url: '/contactsCadeco',
    cache: false,
    views: {
      'menuContent': {
       controller: 'ContactsCtrl',
       templateUrl: 'templates/views_contact/contactslistCadeco.html'
      }
    }
  })
  
  $stateProvider.state('app.search', {
    url: '/parameter(contactSearchName)',
  })

  $stateProvider.state('app.contact', {
    url: "/contact?contactId&addressId&contactPersonId&addressType",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/contact.html",
        controller: 'ContactCtrl'
      }
    }
  })

  $stateProvider.state('app.newperson', {
    url: "/newperson",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/newperson.html",
        controller: 'newpCtrl'
      }
    }
  })


  $stateProvider.state('app.editPerson', {
    url: "/editPerson",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/newperson.html",
        controller: 'editPersonCtrl'
      }
    }
  })

  $stateProvider.state('app.editOrganization', {
    url: "/editOrganization",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/neworganization.html",
        controller: 'editOrganizationCtrl'
      }
    }
  })

  $stateProvider.state('app.neworganization', {
    url: "/neworganization",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/neworganization.html",
        controller: 'neworganizationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
