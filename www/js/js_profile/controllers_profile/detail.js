angular.module('starter.profileDetail',['starter.profileServices','starter.constantProfile'] )
 

.controller('profile', function(my_profile,$state,PopupFactory,$scope,$localstorage,$stateParams,apiUrlLocal) {
  console.log('*******************************************************');
  console.log('USER PROFILE');

  $scope.apiUrlLocal = apiUrlLocal;
  $scope.accessRight = $localstorage.getObject('accessRight');
  $scope.varUpdate = $scope.accessRight.CONTACTPERSON.UPDATE;
  userInfo = $localstorage.getObject('userProfile');
  
  $scope.contact = my_profile.get({});

  $scope.contact.$promise.then(function (results){
    // call factory 
    PopupFactory.getPopup($scope,results);
    $scope.contact = results;
    $scope.telecomss=results.mainData.entity.telecoms;
    
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

    $scope.writeEmail = function(email)
    {      
        $state.go('app.newmail',{'to': email }); 
    }
    
    String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
    }

    $scope.go_to = function(link)
    {      
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

  $scope.changeVisibility = function(){
    console.log("changeVisibility");
  };

  $scope.editPassword = function(){
    $state.go('app.changePassword');
  };

})

  