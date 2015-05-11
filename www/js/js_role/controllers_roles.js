angular.module('starter.rolescontrollers', ['starter.rolesservices'])

// CONTROLLER APP
.controller('AppCtrl', function($localstorage,$scope, $ionicModal, $timeout, $ionicPopup,COLOR_VIEW,COLOR_2) {
  $scope.colorFont = COLOR_VIEW;
  $('ion-nav-bar').css({"color":COLOR_2});

  $scope.accessRight = $localstorage.getObject('accessRight');  

  $scope.accessRightMail = $scope.accessRight.MAIL.VIEW;
  $scope.accessRightAppointment = $scope.accessRight.APPOINTMENT.VIEW;
  $scope.accessRightContact = $scope.accessRight.CONTACT.VIEW;
  $scope.accessRightPerson = $scope.accessRight.CONTACT.VIEW;
  
  //var firstUse = $localstorage.get("starter",null);
  var firstUse = null;
  if(firstUse == null){ 
  
  }
  else{

  }

})

.controller('ControlStartPage', function($localstorage,$scope, $ionicModal, $timeout, $ionicPopup,COLOR_VIEW,COLOR_2) {
  $scope.colorFont = COLOR_VIEW;
  $('ion-nav-bar').css({"color":COLOR_2});

  

})



//  CONTROLLER LOGIN
.controller('LoginController', function ($ionicViewService,$filter,$localstorage,$translate,$templateCache,$window,LoginService,apiUrlLocal,pathLogon,$ionicPopup,$scope,$ionicModal, AuthenticationService,$state,$http,$ionicLoading) {
    'use strict';

    delete $http.defaults.headers.common.Authorization;
    // Session.destroy();
    $ionicViewService.nextViewOptions({
            disableBack: true
        });
    $scope.data = {};
    $scope.iframeHeight = $(window).height();
    $scope.iframeWidth = $(window).width();
    
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }

    // logout
    $scope.closeLogin = function() {
      console.log('==CONTROLLER ROLES== logout', $scope.data);
      $scope.modal.hide();
    };

    // login
    $scope.doLogin = function() {     
      console.log('==CONTROLLER ROLES== data from UI:', $scope.data);
      console.log('====================:', $scope.data.username);
      
      // do nothing if data es null
      if ($scope.data.username != null && $scope.data.password != null && $scope.data.company != null) {
        
        // Simple POST request
        $http({
          method: 'POST',
          url: apiUrlLocal+""+pathLogon,
          data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
        }).success(function(data, status, headers, config) {
          
          console.log('==CONTROLLER LOGIN== REQUEST SUCCESS OK',data);

          
          if( data.mainData)
          {
            $localstorage.setObject('accessRight',data.mainData.accessRight);
            $localstorage.setObject('userInfo',data.mainData.userInfo);

            var lenguage = data.mainData.userInfo.locale;
            console.log("==CONTROLLER LOGIN==  lenguage: ",lenguage );
            $scope.ChangeLanguage(lenguage);
            AuthenticationService.login({name: $scope.data.username, company: $scope.data.company});
            $scope.closeLogin();
            
            if (data.mainData.accessRight.CONTACT.VIEW == "true") {
              $state.go('app.contacts');
            }
            else{
              if (data.mainData.accessRight.APPOINTMENT.VIEW == "true") {
                $state.go('app.schedulerDay');
              }
              else{
                if (data.mainData.accessRight.MAIL.VIEW == "true") {
                  $state.go('app.mailboxes');
                }
                else{
                  $state.go('app.startPage');      
                }
              }
            }
          }
          else
          {
            // popup credencial failed
            var message = $filter('translate')('Messagefailed');
            var alertPopup = $ionicPopup.alert({
               title: message
            });
            
            $state.go('login');
            
          }
        }).
        error(function(data, status, headers, config) {
         console.log('==CONTROLLER LOGIN== REQUEST SUCCESS ERROR', data);
        });  
      }
      else
      {
        // popup credencial failed
            var message = $filter('translate')('MessageRequired');
            var alertPopup = $ionicPopup.alert({
               title: message
            });

            $state.go('login');
      }
      
    };

})

//  CONTROLLER LOGOUT
.controller('logoutController', function($rootScope,$http,$scope, $state,AuthenticationService){
    'use strict';
    
    delete $http.defaults.headers.common.Authorization;
    Session.destroy();
    AuthenticationService.logout();
});
