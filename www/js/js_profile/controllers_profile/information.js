angular.module('starter.information',['starter.profileServices','starter.constantProfile'] )
 

.controller('information_controller', function($http, $state,PopupFactory,$scope,$localstorage,$stateParams,apiUrlLocal) {
  console.log('*******************************************************');
  console.log('INFORMATION');

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


})

  