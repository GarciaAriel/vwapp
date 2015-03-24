angular.module('starter.contactcontrollers', [])

// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
// })

.controller('ContactsCtrl', function($scope, contacts, $ionicLoading){
    $scope.contacts = contacts.list;

    $scope.addContact = function(){
        contacts.add().then(function(){
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $ionicLoading.show({
        template: '<i class="ion-load-c"></i><br/>Cargando...'
    });
    contacts.ready.then(function(){
        $ionicLoading.hide();
    });

})

//
// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
//   console.log("Controller CONTACTS get all",$scope.contacts);
//
//   $scope.searchcon = function(){
//     alert("button searchcon pressed");
//   };
//
//   $scope.addper = function(){
//     alert("button addper pressed");
//   };
//
//   $scope.addcom = function(){
//     alert("button addcom pressed");
//   };
//
// })




// .controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
//   $scope.contact = Contacts.get($stateParams.contactId);
// })


.controller('ContactDetailCtrl', function($scope, contact, contacts, $ionicActionSheet){
    $scope.contact = contact;

    $scope.borrarPersona = function(){
    $ionicActionSheet.show({
        destructiveText: 'Delete ' + contact.name.first +" " +contact.name.last,
        cancelText: 'Cancel',
        destructiveButtonClicked: function(){
            contacts.list.splice(contacts.list.indexOf(contact),1);
            window.history.back();
        }
    });
    };
});
