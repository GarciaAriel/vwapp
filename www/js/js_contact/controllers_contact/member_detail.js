angular.module('starter.contactDetailMember',['starter.contactservices','starter.constantscontact'] )
 
.controller('contactDatailMember', function(participant_detail,$state,PopupFactory,$scope,$localstorage,$stateParams,apiUrlLocal) {
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.accessRight = $localstorage.getObject('accessRight');  
  console.log('Access Right',$scope.accessRight);

  console.log('Access addressId',$stateParams.addressId);
  console.log('Access contactPersonId',$stateParams.contactPersonId);
  console.log('Access addressType',$stateParams.addressType);

  $scope.varUpdate = $scope.accessRight.CONTACTPERSON.UPDATE;  
         
  $scope.contact = participant_detail.get({"contactId": $stateParams.addressId, "dto(addressId)": $stateParams.addressId,"dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)":$stateParams.addressType});

  $scope.contact.$promise.then(function (results){
    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss=results.mainData.entity.telecoms;
    console.log("list of telecoms",$scope.telecomss);

    function compare(a,b) {     
      if (a.telecomTypePosition > b.telecomTypePosition) {
        return 1;
      }
      if (a.telecomTypePosition < b.telecomTypePosition) {
        return -1;
      }
      return 0;
    }

    $scope.telecomss.sort(compare);
    console.log('list of telecoms sort',$scope.telecomss);

    $scope.writeEmail = function(email) {      
        $state.go('app.newmail',{'to': email }); 
    }
    
    String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
    }

    $scope.go_to = function(link) {      
      if (!link.startsWith("http://")){
        window.open('http://'+link, '_system', 'location=yes'); return false;
      }
      else{
       window.open(link, '_system', 'location=yes'); return false; 
      }       
    }    

    $localstorage.setObject("EditContact",results.mainData);

    if (results.mainData.entity.countryId != "") {
      var countries = results.mainData.countryArray;
      countries.forEach(function(country) {
          if (country.countryId == results.mainData.entity.countryId) {
            $scope.countryName = country.name;
          }
      });
    }

    if (results.mainData.entity.titleId != "") {
      var titles = results.mainData.titleArray;
      titles.forEach(function(title) {
          if (title.titleId == results.mainData.entity.titleId) {
            $scope.titleperson = title.name;
          }
      });
    }

  });

})

  