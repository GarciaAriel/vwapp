angular.module('starter.contactcontrollers',['starter.contactservices','starter.constantscontact'] )
 



.controller('ContactsCtrl', function($scope,COLOR_VIEW, Contact,$timeout,$ionicLoading,apiUrlLocal,$location, $state, $window) {
    
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
    $scope.searchKey = "";
    $scope.pag = 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');


$scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});

$scope.newContacts.$promise.then(function (results){
  
$scope.contacts = (results['mainData'])['list'];
    $scope.pagesintotal = parseInt((results['mainData'])['pageInfo']['totalPages']);
  $scope.$broadcast('scroll.refreshComplete'); 
    
     $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
  
  
    
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




 $scope.createp = function() {
      /* $location.path('/tab/newpost'); */   /* this variant doesnt work */
     
     
     
//      $window.location.href = '/newperson';
    
     console.log("go to create person");
      $state.go('app.newperson'); 
    };
                            
     })






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


})



.controller('newpCtrl', function ($scope,$ionicModal, AuthenticationService,$state,$http,$ionicLoading,$location, $state, $window) {

    
    $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
    
    $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    
//     $scope.createp = function() {
//      /* $location.path('/tab/newpost'); */   /* this variant doesnt work */
//      $state.go("/app/newperson"); 
//    };
    
//    $scope.data = {};
//
//    $ionicModal.fromTemplateUrl('templates/login.html', {
//      scope: $scope
//    }).then(function(modal) {
//      $scope.modal = modal;
//    });
//
//    $scope.closeLogin = function() {
//      $scope.modal.hide();
//    };
//
//    $scope.doLogin = function() {
//      console.log('==LOGIN== HTTP POST REQUEST', $scope.data);
//      
//      // Simple POST request
//      $http({
//        method: 'POST',
//        url: apiUrlLocal+""+pathLogon,
//        data: {"dto(login)":$scope.data.username, "dto(companyLogin)":$scope.data.company, "dto(password)":$scope.data.password, "dto(language)":"en","dto(rememberInfo)":true}
//      }).success(function(data, status, headers, config) {
//        
//        console.log('==LOGIN== REQUEST SUCCESS OK');
//        console.log("dataaaa",data);
//
//        if( data != "KO" )
//        {
//          AuthenticationService.login({name: $scope.data.username, company: $scope.data.company});
//          $scope.closeLogin();
//          $state.go('app.contacts');
//        }
//        else
//        {
//          
//          var alertPopup = $ionicPopup.alert({
//             title: 'Log on, Failed!',
//             template: 'Please check your credentials!'
//           });
//          // $state.previous = 'login';
//          // $ionicLoading.hide();
//          
//          $state.go('/app.contact');
//          // $window.location.reload(true)
//        }
//      }).
//      error(function(data, status, headers, config) {
//       console.log('==LOGIN== ERROR', data);
//      });
//
//    };
//
//})
//
////  CONTROLLER LOGOUT
//.controller('logoutController', function($scope, $state,AuthenticationService){
//    'use strict';
//    AuthenticationService.logout();
    
});





