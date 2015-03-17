angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {

  

  $scope.mailsSubMenu = MailsSubMenu.all();
  console.log("Controller WEBMAIL mailboxes folders",$scope.mailsSubMenu);
})

.controller('MailsListCtrl', function($scope, $stateParams, MailList) {
  $scope.mailList = MailList.all($stateParams.itemId); 
  console.log("Controller WEBMAIL list mails",$scope.mailList);
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailList, $ionicSlideBoxDelegate) {
  $scope.data = [];
  $scope.myActiveSlide = $stateParams.mailId;
  $scope.data.slides = 	MailList.all($stateParams.folderId); 
  
  $scope.mail = MailList.get($stateParams.folderId,$stateParams.mailId);
  console.log("Controller WEBMAIL detail mail",$scope.mail);

  $ionicSlideBoxDelegate.update();
});

