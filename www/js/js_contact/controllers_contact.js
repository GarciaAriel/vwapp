angular.module('starter.contactcontrollers', [])

// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
// })

.controller('ContactsCtrl', function($scope, Contacts) {
	console.log("llegaaaaaaaaaaaaaa");	
  $scope.contacts = Contacts.all(); 
  console.log("controller despues llamada",Contacts.all());
  console.log("controller despues llamada",$scope.contacts);
})




.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
});

