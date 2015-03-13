angular.module('starter.contactcontrollers', [])

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all();
})

// .controller('ContactsCtrl', function($scope, MailList) {
//   $scope.mailList = MailList.all(); 
//   console.log("Controller WEBMAIL list mails");
// })




.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
});

