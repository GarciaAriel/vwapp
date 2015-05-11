angular.module('starter.contactcontrollers',['starter.contactservices','starter.constantscontact'] )
 




.controller('editPersonCtrl', function(bridgeService,$scope,COLOR_VIEW, $stateParams,apiUrlLocal,$localstorage) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

    // get contact for edit
    var mainData = bridgeService.getContact();
    $scope.entity = mainData.entity;
    
    console.log("==CONTACTS CONTROLLER==  get contact data:-----",mainData);

    var salutationArray = mainData.salutationArray;  
    $scope.salutations = [];    
    salutationArray.forEach(function(salutation) {           
        $scope.salutations.push({
          name: salutation.name,
          value:salutation.salutationId
        });       
        if($scope.entity.salutationId == salutation.salutationId) {             
           $scope.salutation = $scope.salutations[$scope.salutations.length-1];  
        } 
    });

    // var tittleArray = mainData.titleArray;  
    // $scope.tittles = [];    
    // tittleArray.forEach(function(tittle) {           
    //     $scope.tittles.push({
    //       name: tittle.name,
    //       value:tittle.salutationId
    //     });       
    //     if($scope.entity.salutationId == salutation.salutationId) {             
    //        $scope.salutation = $scope.salutations[$scope.salutations.length-1];  
    //     } 
    // });

})

.controller('editOrganizationCtrl', function(CountryService,LanguageService,bridgeService,$scope,COLOR_VIEW, $stateParams,apiUrlLocal,$localstorage) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

    // get contact for edit
    var mainData = bridgeService.getContact();
    $scope.entity = mainData.entity;
    
    console.log("==CONTACTS CONTROLLER==  get contact data:",$scope.entity);
    
    
    var countryArray = CountryService.getCountry();  
    $scope.countries = [];    
    countryArray.forEach(function(country) {           
        $scope.countries.push({
          name: country.name,
          value:country.countryId
        });       
        if($scope.entity.countryId == country.countryId) {             
           $scope.country = $scope.countries[$scope.countries.length-1];  
        } 
    });    

    var languageArray = LanguageService.getLanguage();
    $scope.languages = [];    
    languageArray.forEach(function(language) {           
        $scope.languages.push({
          name: language.name,
          value:language.languageId
        });       
        if($scope.entity.languageId == language.languageId) {             
           $scope.language = $scope.languages[$scope.languages.length-1];  
        } 
    });    

})

.controller('ContactsCtrl', function($localstorage,$filter,$ionicScrollDelegate,$window,$scope,COLOR_VIEW, Contact,$timeout,$ionicLoading,apiUrlLocal,$location, $state, $window,$ionicPopup) {
    
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
        // $state.go('app.contacts', {}, { reload: true });
        // $state.go('productList', {}, { reload: true });

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

        // $window.location.reload();
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
    console.log("+++++new info",(results['mainData']));
    console.log("++++new page #", $scope.page);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("++++new contacts list ", $scope.contacts);
      
      if ($scope.pagesintotal<=$scope.page+1) {
          $scope.asknext = false;  
        };
      
  });
    };

$scope.getContactUrl = function(item){
  // GET ACCESS RIGHT FOR CONTACT PERSON
  var accessRight = $localstorage.getObject('accessRight');
  accessRightContactPerson = $scope.accessRight.CONTACTPERSON.VIEW;  

  // IF CONTACT PERSON HAVE PERMISSION TO READ
  if (item.contactPersonAddressId != "" && accessRightContactPerson != "true") {
    return "#";
  };
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
    $scope.contacts = [];
    $scope.showSearchBar = !$scope.showSearchBar;
    $scope.buscados = Contact.query({'parameter(contactSearchName)':$scope.searchKey});
    $scope.asknext = false;

    $scope.buscados.$promise.then(function (results){
            
        $scope.pag=parseInt((results['mainData'])['pageInfo']['pageNumber']);
        $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);
                
        $scope.contacts = (results['mainData'])['list'];
        console.log("search info", results['mainData']);
        console.log("list  of contacts, first search", $scope.contacts);
         
        if ($scope.contacts.length > 0 && $scope.totalpag>$scope.pag) {
          $scope.asknext = true;  
        }; 

        // if no exists items show message
        if ($scope.contacts.length == 0) {

          var message = $filter('translate')('NoItems');
          var messageRefresh = $filter('translate')('PulltoRefresh');
          // An alert dialog
          console.log("==CONTROLLER CONTACTS== alert if no exists items");
          var alertPopup = $ionicPopup.alert({
              title: message,
              template: messageRefresh
          });
        }
        $ionicScrollDelegate.scrollTop();
                
    });
      
    $scope.loadMore = function() {
        console.log("trying to load more of the search",$scope.pag);
        // if($scope.pag<=$scope.totalpag){
//              $scope.asknext=true;
            $scope.pag = $scope.pag +1;
            // $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);

            $scope.buscados = Contact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.pag});
            $scope.buscados.$promise.then(function(results){

                $scope.totalpag=parseInt((results['mainData'])['pageInfo']['totalPages']);

                console.log("===== 000new info for search",(results['mainData']));
                $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.log("======0000new list of contacts for search",$scope.contacts);
                
            });
            console.log("==12121212",$scope.totalpag);
            console.log("==12121212",$scope.pag);
            if ($scope.totalpag<$scope.pag+1) {
              $scope.asknext = false;  
            };
            
        // }
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






.controller('ContactCtrl', function(CountryService,LanguageService,bridgeService,$scope,COLOR_VIEW,$localstorage,$stateParams, Contact,apiUrlLocal) {
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.colorFont = COLOR_VIEW;

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);

  $scope.contact = Contact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss=results.mainData.entity.telecoms;
    console.log("list of telecoms",$scope.telecomss);

    $localstorage.setObject("EditContact",results.mainData);

    CountryService.saveCountry(results.mainData.countryArray);
    LanguageService.saveLanguage(results.mainData.languageArray);

    if (results.mainData.entity.countryId != "") {
      var countries = results.mainData.countryArray;
      countries.forEach(function(country) {
          if (country.countryId == results.mainData.entity.countryId) {
            $scope.countryName = country.name;
          }
      });
    }

    // save contact for edit do not call service
    bridgeService.saveContact($scope.contact.mainData);
    
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
    
})


.controller('neworganizationCtrl', function ($scope,$ionicModal, AuthenticationService,$state,$http,$ionicLoading,$location, $state, $window,COLOR_VIEW) {
  $scope.colorFont = COLOR_VIEW;

  $scope.countries = [
    {name:'Vereinigte Arabische Emirate', value:'AE'},
    {name:'Andorra', value:'AD'},
  ];

  $scope.country = $scope.countries[0]; 

});




