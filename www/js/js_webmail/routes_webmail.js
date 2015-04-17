
angular.module('starter.webmailroutes', ['starter.webmailcontrollers'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // ROUTE MAIL DETAIL
  .state('app.details-mail', {  
      url: '/mail-detail?mailId&folderId&imageFrom&fromImageId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mail-detail.html',
          controller: 'MailDetailCtrl'
        }
      }
  })

  //  ROUTE MAILLIST IN ANY FOLDER
  .state('app.mail-items', {
      url: '/mail-list?pageParam&folderId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mails-list.html',
          controller: 'MailsListCtrl'
        }
      }
  })

   // ROUTE LIST FOLDERS
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
