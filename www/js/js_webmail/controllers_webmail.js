angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {
  $scope.mailsSubMenu = MailsSubMenu.all();
})

.controller('MailsListCtrl', function($scope,  MailList) {
  $scope.mailList = MailList.all();
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailList) {
  $scope.mail = MailList.get($stateParams.mailId);
});

