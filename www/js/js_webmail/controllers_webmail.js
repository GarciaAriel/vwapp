angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu) {

  

  $scope.mailsSubMenu = MailsSubMenu.all();
  console.log("Controller WEBMAIL mailboxes folders",$scope.mailsSubMenu);
})

.controller('MailsListCtrl', function($scope, $stateParams, MailLoadBD) {
  $scope.mailList = MailLoadBD.all($stateParams.itemId); 
  console.log("Controller WEBMAIL list mails",$scope.mailList);
})

.controller('MailDetailCtrl', function($scope, $stateParams, MailLoadBD, $ionicSlideBoxDelegate) {
  $scope.data = [];
  $scope.myActiveSlide = $stateParams.mailId;
  $scope.data.slides = 	MailLoadBD.all($stateParams.folderId); 
  
  $scope.mail = MailLoadBD.get($stateParams.folderId,$stateParams.mailId);
  console.log("Controller WEBMAIL detail mail",$scope.mail);

  $ionicSlideBoxDelegate.update();
});

