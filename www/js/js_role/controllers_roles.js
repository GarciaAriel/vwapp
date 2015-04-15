angular.module('starter.rolescontrollers', ['starter.rolesservices'])

// CONTROLLER APP
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup,colo) {
  $scope.colo = colo;
  //call services data
  // Contacts.all();
  //MailList.all();
  // TaskList.all();

  //var firstUse = $localstorage.get("starter",null);
  var firstUse = null;
  if(firstUse == null){ //if first time
    // Contacts.all();
    // MailList.all();
  }
  else{

  }

})

//  CONTROLLER LOGIN
.controller('LoginController', function (LoginService,apiUrlLocal,pathLogon,$ionicPopup,$scope,$ionicModal, AuthenticationService,$state,$http) {
    'use strict';

    $scope.data = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    $scope.doLogin = function() {
      console.log('==LOGIN== HTTP POST REQUEST', $scope.data);
      
      // Simple POST request
      $http({
        method: 'POST',
        url: apiUrlLocal+""+pathLogon,
        data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
      }).success(function(data, status, headers, config) {
        
        console.log('==LOGIN== REQUEST SUCCESS OK');
        console.log("dataaaa",data);

        if( data != "KO" )
        {
          AuthenticationService.login({name: $scope.data.username, company: $scope.data.company});
          $scope.closeLogin();
          $state.go('app');
        }
        else
        {
          console.log("error login");
          // $state.previous = '/login';
          var alertPopup = $ionicPopup.alert({
                title: 'aaaLog on, Failed!',
                template: 'aaaPlease check your credentials!'
            });

        }
      }).
      error(function(data, status, headers, config) {
       console.log('==LOGIN== ERROR', data);
      });

    };

})

//  CONTROLLER LOGOUT
.controller('logoutController', function($scope, $state,AuthenticationService){
    'use strict';
    AuthenticationService.logout();
});
