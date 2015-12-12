angular.module('starter.rolescontrollers', ['starter.rolesservices'])

// CONTROLLER APP
.controller('AppCtrl', function($location,$state,LogoutService,$localstorage,$scope, $ionicModal, $timeout, $ionicPopup) {
  
  $scope.accessRight = $localstorage.getObject('accessRight');
  
  $scope.accessRightContact = $scope.accessRight.CONTACT.VIEW;
  $scope.accessRightPerson = $scope.accessRight.CONTACT.VIEW;
  $scope.accessRightProduct = $scope.accessRight.PRODUCT.VIEW;

  $scope.logout = function(){

    $scope.callResult = LogoutService.query({});
       
    $scope.callResult.$promise.then(function (results){
      $localstorage.set("currentUser",'false');
      console.log("==CONTROLLER ROLES== logout",results);
      $state.go('login');
    })
  }
})

.controller('ControlStartPage', function($localstorage,$scope, $ionicModal, $timeout, $ionicPopup) {})

//  CONTROLLER LOGIN
.controller('LoginController', function (PopupFactory,$filter,$localstorage,$translate,$window,apiUrlLocal,pathLogon,$ionicPopup,$scope,$ionicModal,$state,$http) {

    'use strict';
    console.log('*******************************************************');
    console.log('CONTROLLER LOGIN');
    delete $http.defaults.headers.common.Authorization;

    if(typeof $localstorage.getObject("rememberUsername") == "string") {
      $scope.data = {username: $localstorage.getObject("rememberUsername") ,password: "", company: $localstorage.getObject("rememberCompany")};

      var request = $http({
        method: "get",        
        url: apiUrlLocal+"/bmapp/Logon/Company/DownloadLogoImage.do?dto(companyLogin)="+$localstorage.getObject("rememberCompany")+"&isCompanyLogo=true",                        
      });      
      request.success(
        function(data, status, headers, config) {
          if(data.forward != "Fail")
          {
            $scope.imageUrlCompany= "/bmapp/Logon/Company/DownloadLogoImage.do?dto(companyLogin)="+$localstorage.getObject("rememberCompany")+"&isCompanyLogo=true";
            $scope.imageUrlCompany=apiUrlLocal+$scope.imageUrlCompany;            
          }
          
        }
      );      
    }
    else
      $scope.data= {};
         
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

    // login
    $scope.doLogin = function() {  
      console.log('-------------------------------------------------------');
      console.log('==DO LOGIN==');
      console.log('data from UI:', $scope.data);
      
      var name = $scope.data.username;
      var pass = $scope.data.password;
      var comp = $scope.data.company;

      if (name != null && name != "" && pass != null && pass != "" && comp != null && comp != "") {
        
        // Simple POST request
        $http({
          method: 'POST',
          url: apiUrlLocal+""+pathLogon,
          data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
        }).success(function(data, status, headers, config) {

          // call factory 
          PopupFactory.getPopup($scope,data);
          console.log("aaaaaaaaa mier");
          if (data.forward != "Fail") {
              console.log("results of request: ",data);

              $localstorage.setObject('accessRight',data.mainData.accessRight);
              $localstorage.setObject('userInfo',data.mainData.userInfo);
              $localstorage.setObject('userProfile',data.mainData.userInfo);
              $localstorage.setObject('rememberUsername',$scope.data.username);
              $localstorage.setObject('rememberCompany',$scope.data.company);
              $localstorage.set("currentUser",'true');

              var lenguage = data.mainData.userInfo.locale;
              var timeZone = data.mainData.userInfo.dateTimeZone;
              console.log("locale: ","-"+lenguage+"-" );
              console.log(timeZone );
              $scope.ChangeLanguage(lenguage);
              
              //if (data.mainData.accessRight.PRODUCT.VIEW == "true") {
                $state.go('app.products');
                //$state.go('app.start');
              //}
              //else{
                //if (data.mainData.accessRight.CONTACT.VIEW == "true") {
                  //$state.go('app.contacts');
                //}
                //else{
                //  if (data.mainData.accessRight.MAIL.VIEW == "true") {
                //    $state.go('app.mailboxes');
               //   }
                //  else{
               //     $state.go('app.startPage');  
               //   }
               // }
              //}
          };
          

        }).
        error(function(data, status, headers, config) {
         console.log('==CONTROLLER LOGIN== REQUEST SUCCESS ERROR', data);
        });  
      }
      else{
        // popup credencial failed
            var message = $filter('translate')('MessageRequired');
            var alertPopup = $ionicPopup.alert({
               title: message
            });
            $state.go('login');
      }
      
    };

});
