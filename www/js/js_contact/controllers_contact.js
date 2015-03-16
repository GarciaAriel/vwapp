angular.module('starter.contactcontrollers', [])

// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
// })

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all(); 
  console.log("Controller CONTACTS get all",$scope.contacts);
})




.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
});

