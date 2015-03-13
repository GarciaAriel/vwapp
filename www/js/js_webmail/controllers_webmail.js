angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {
  $scope.mailsSubMenu = MailsSubMenu.all();
  console.log("Controller WEBMAIL mailboxes folders");
})

.controller('MailsListCtrl', function($scope, $stateParams, MailList) {
  $scope.mailList = MailList.all($stateParams.itemId); 
  console.log("mierda",$stateParams.itemId);
  console.log("Controller WEBMAIL list mails");
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailList) {
  $scope.mail = MailList.get($stateParams.folderId,$stateParams.mailId);
  console.log("Controller WEBMAIL detail mail");
});

