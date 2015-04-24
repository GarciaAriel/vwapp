angular.module('starter.rolescontrollers', ['starter.rolesservices'])

// CONTROLLER APP
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup,COLOR_VIEW,COLOR_2) {
  $scope.colorFont = COLOR_VIEW;
  $('ion-nav-bar').css({"color":COLOR_2});
  
  //var firstUse = $localstorage.get("starter",null);
  var firstUse = null;
  if(firstUse == null){ 
  
  }
  else{

  }

})


//  CONTROLLER LOGIN
.controller('LoginController', function ($window,LoginService,apiUrlLocal,pathLogon,$ionicPopup,$scope,$ionicModal, AuthenticationService,$state,$http,$ionicLoading) {
    'use strict';

    $scope.data = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // logout
    $scope.closeLogin = function() {
      console.log('==CONTROLLER ROLES== logout', $scope.data);
      $scope.modal.hide();
    };

    // login
    $scope.doLogin = function() {
      console.log('==CONTROLLER ROLES== data from UI', $scope.data);
      
      // do nothing if data es null
      if ($scope.data.username != null && $scope.data.password != null && $scope.data.company != null) {
        
        // Simple POST request
        $http({
          method: 'POST',
          url: apiUrlLocal+""+pathLogon,
          data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
        }).success(function(data, status, headers, config) {
          
          console.log('==CONTROLLER LOGIN== REQUEST SUCCESS OK',data);
          
          if( data != "KO" )
          {
            AuthenticationService.login({name: $scope.data.username, company: $scope.data.company});
            $scope.closeLogin();
            $state.go('app.contacts');
          }
          else
          {
            // popup credencial failed
            var alertPopup = $ionicPopup.alert({
               title: 'Log on, Failed!',
               template: 'Please check your credentials!'
            });
            
            $state.go('/app.contact');
            
          }
        }).
        error(function(data, status, headers, config) {
         console.log('==CONTROLLER LOGIN== REQUEST SUCCESS ERROR', data);
        });  
      }
      
    };

})

//  CONTROLLER LOGOUT
.controller('logoutController', function($scope, $state,AuthenticationService){
    'use strict';
    AuthenticationService.logout();
});
