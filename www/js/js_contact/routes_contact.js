
angular.module('starter.contactroutes', [])


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

<<<<<<< HEAD
    })
  
  
  
  
  $stateProvider.state('app.search', {
                url: '/parameter(contactSearchName)',
//                templateUrl: 'templates/employee-list.html',
//                controller: 'EmployeeListCtrl'
            })
=======
 })
>>>>>>> d9cf3d732357bd12a14cccbf9ecf718156c33d96

// $stateProvider.state('app.contact-detail', {
//     url: '/contact-detail/:index',
//     views: {
//     'menuContent': {
//          templateUrl: 'templates/views_contact/contact-detail.html',
//          controller: 'ContactDetailCtrl'
//          resolve: {
//              persona: function($stateParams, gente){
//                  return gente.ready.then(function(){
//                      return gente.list[+$stateParams.index]
//                      });
//                  }
//              }
//        }
//      }
//
//     });

  // .state('app.contacts', {
  //     url: '/contacts',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/views_contact/sub-contacts.html',
  //         controller: 'ContactsCtrl'
  //       }
  //     }
  //   })
  //
  //
  //    .state('app.contact-detail', {
  //     url: '/contact/:contactId',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/views_contact/contact-detail.html',
  //         controller: 'ContactDetailCtrl'
  //       }
  //     }
  //   })

//  $stateProvider.state('app.contact', {
//     url: '/contact/:index',
//     views: {
//       'menuContent': {
//     controller: 'ContactDetailCtrl',
//     templateUrl: 'templates/views_contact/contact.html',
//     resolve: {
//       contact: function($stateParams, contacts){
//             return contacts.ready.then(function(){
//                 return contacts.list[+$stateParams.index]
//                 });
//             }
//         }
//         }
//       }
//     });
  
  
   $stateProvider.state('search', {
                url: '/?parameter(contactSearchName)',
//                templateUrl: 'templates/employee-list.html',
//                controller: 'EmployeeListCtrl'
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
