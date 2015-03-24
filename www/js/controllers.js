angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,MailList,Contacts, $ionicPopup,$localstorage) {
  // Form data for the login modal
  $scope.loginData = {};


  Contacts.all();
  MailList.all(); 
  var firstUse = $localstorage.get("starter",null);
  if(firstUse == null){ //if first time
    // Contacts.all();
    // MailList.all(); 
    
  }
  else{
    
  }
    

  // var asd = Contacts.all();
  // var mailList = MailList.all();

  // $scope.searchcon = function(){
  //   alert("button searchcon pressed");
  // };


  // if(window.localStorage.getItem('firstTime') == null){ //if first time
  //   var alertPopup = $ionicPopup.alert({
  //               title: 'primer usoooooooooo',
  //               template: 'Please check your credentials!'
  //           });
  // }
  // else{
  //   var alertPopup = $ionicPopup.alert({
  //               title: 'segundo usoooooooooooo',
  //               template: 'Please check your credentials!'
  //           });
  // }
  //




  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('DashCtrl', function($scope) {})

//doooooooooooooooooooooooooooooooooooooooooooooo
.controller('LoginController', function ($scope, AuthenticationService,$state) {
    'use strict';

    $scope.data = {};

    $scope.login = function() {
      
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)
      AuthenticationService.login({name: $scope.data.username, role: $scope.data.password});    
      console.log("datos",$scope.data);
      $state.go('app');
    }
    
})

.controller('logoutController', function($scope, $state,AuthenticationService){
    'use strict';
    AuthenticationService.logout();
})

//dooooooooooooooooooooooooooooooooooooooooooo

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Log on, Failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'mail 1', id: 1 },
    { title: 'mail2 ', id: 2 },
    { title: 'tarea q', id: 3 },
    { title: 'tares', id: 4 }

  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
