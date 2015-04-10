
angular.module('starter.webmailroutes', ['starter.webmailcontrollers'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
// details mail

  .state('app.details-mail', {  
      url: '/mail-detail?mailId&folderId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mail-detail.html',
          controller: 'MailDetailCtrl'
        }
      }
    })

//mail list in folder
   .state('app.mail-items', {
      url: '/mail-list/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mails-list.html',
          controller: 'MailsListCtrl'
        }
      }
    })

   //folders mails route
   .state('app.mailboxes', {
      url: '/mailboxes',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/sub-menu-mails.html',
          controller: 'MailsCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
