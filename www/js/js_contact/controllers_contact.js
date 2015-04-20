


angular.module('starter.contactcontrollers',['starter.contactservices'],function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.withCredentials = true;
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
   var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})



.controller('ContactsCtrl', function($scope,COLOR_VIEW, Contact,$timeout,$ionicLoading,apiUrlLocal) {
    
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;
    $scope.pagesintotal; 
  $scope.page = 1; 


$scope.showSearchBar = false;
$scope.apiUrlLocal = apiUrlLocal;
$scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});
$scope.contacts = [];
    
    $scope.asknext = false;
   

console.log("FIRST CALL",$scope.newContacts);


$scope.newContacts.$promise.then(function (results){
  console.log("THIS INFO",(results['mainData']));
  
  $scope.contacts = (results['mainData'])['list'];


console.log('LIST OF THE FIRST CONTACTS',$scope.contacts);
$scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
console.log("page integer", $scope.page);
console.log("pages in total", $scope.pagesintotal);
    
     if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
        $scope.asknext = true;  
      };

    
  });


$scope.doRefresh = function() {
    $scope.page=1;


$scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});

$scope.newContacts.$promise.then(function (results){
  
$scope.contacts = (results['mainData'])['list'];
    $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
  $scope.$broadcast('scroll.refreshComplete'); 
  
  
    
        console.log('COMEBACK TO THE FIRST LIST',$scope.page);
        console.log('WITH THIS CONTACTS',$scope.contacts);
        console.log('PAGE #',$scope.page);
    console.log("pages in total on refresh", $scope.pagesintotal);
    
    if ($scope.contacts.length > 0 && $scope.pagesintotal>$scope.page) {
        $scope.asknext = true;
      };
    
});
};  

$scope.loadMore = function() {
    
  console.log('Loading more contacts');
  $scope.page = $scope.page + 1;
  $scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});
  $scope.newContacts.$promise.then(function(results){
    console.log("new info",(results['mainData']));
    console.log("new page #", $scope.page);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("new contacts list ", $scope.contacts);
      
      if ($scope.pagesintotal<=$scope.page+1) {
          $scope.asknext = false;  
        };
      
  });
    };

$scope.getContactUrl = function(item){

  return item.contactPersonAddressId ==='' ? '#/app/contact?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/contact?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;
};



$scope.searchcon = function(){
$scope.showSearchBar = !$scope.showSearchBar;

}   






$scope.clearSearch = function () {
  $scope.searchKey = "";
  $scope.buscados = Contact.query();
  console.log("clean text",$scope.buscados);
  $scope.showSearchBar = !$scope.showSearchBar;
}


        
            
$scope.search = function () {
//    $scope.asknext="true";
            $scope.showSearchBar = !$scope.showSearchBar;
            $scope.buscados = Contact.query({'parameter(contactSearchName)':$scope.searchKey});


     $scope.buscados.$promise.then(function (results){
         
                     
            
                 $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
                 $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
                
                 $scope.contacts = (results['mainData'])['list'];
                console.log("search info", results['mainData']);
                  console.log("list  of contacts, first search", $scope.contacts);
         
//                    if ($scope.contacts.length > 0 && $scope.totalpag>$scope.pag) {
//                    $scope.asknext = true;  
//      };
                
         
                 
             });
                 
    $scope.doRefresh();
                     
                     


      
      
      $scope.loadMore = function() {
          console.log("trying to load more of the search");
          if($scope.pag<=$scope.totalpag){
//              $scope.asknext=true;
            $scope.pag=$scope.pag +1;
   $scope.buscados = Contact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.pag});
  $scope.buscados.$promise.then(function(results){
    console.log("new info for search",(results['mainData']));
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("new list of contacts for search",$scope.contacts);
      
  });
}
//          if ($scope.totalpag<=$scope.pag+1) {
//            $scope.asknext = false;  
//              console.log("end of search");
//        };
           
      };
    
}
            
       
    
  
                    
     }



)

.controller('ContactCtrl', function($scope,COLOR_VIEW, $stateParams, Contact,apiUrlLocal) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);


  $scope.contact = Contact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    $scope.contact = results;


$scope.telecomss=results.mainData.entity.telecoms;
console.log("list of telecoms",$scope.telecomss);



});


  










});





