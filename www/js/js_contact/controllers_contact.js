angular.module('starter.contactcontrollers', [])

// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
// })

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all();
  console.log("Controller CONTACTS get all",$scope.contacts);

  $scope.searchcon = function(){
    alert("button searchcon pressed");
  };

  $scope.addper = function(){
    alert("button addper pressed");
  };

  $scope.addcom = function(){
    alert("button addcom pressed");
  };

})




.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
});
