angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {
	console.log("toda la lista",MailsSubMenu.all());
  $scope.mailsSubMenu = MailsSubMenu.all();
})

.controller('MailsListCtrl', function($scope, $stateParams, MailList) {

  console.log($stateParams.itemId);
  $scope.mailList = MailList.all($stateParams.itemId); 
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailList) {
	console.log("controller",$stateParams.folderId);
	console.log("controller",$stateParams.mailId);
	console.log("controller",$stateParams);
  $scope.mail = MailList.get($stateParams.folderId,$stateParams.mailId);
});

