
angular.module('starter.webmailroutes', [])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  
  .state('app.details-mail', {
      url: '/mail/:folderId/:mailId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mail-detail.html',
          controller: 'MailDetailCtrl'
        }
      }
    })



   .state('app.mail-items', {
      url: '/listmails/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'templates/views_webmail/mails-list.html',
          controller: 'MailsListCtrl'
        }
      }
    })  
  
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
