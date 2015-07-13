angular.module('starter.productsController',[] )

// 
// CONTROLLER PRODUCT DETAIL
//
.controller('ProductDetail_Controller', function($ionicSlideBoxDelegate,$ionicModal,contactPersonDetail,$state,PopupFactory,bridgeService,$scope,COLOR_VIEW,$localstorage,$stateParams, Contact,apiUrlLocal) {
  console.log('*******************************************************');
  console.log("==CONTROLLER PRODUCTS== detail product");
  console.log("state params contact id",$stateParams.contactId);
  console.log("state params address id",$stateParams.addressId);
  console.log("state params contact person id",$stateParams.contactPersonId);
  console.log("state params name1",$stateParams.name1);
  console.log("state params name2",$stateParams.name2);

  $scope.myActiveSlide = 1;


  $scope.apiUrlLocal = apiUrlLocal;
  $scope.colorFont = COLOR_VIEW;

  $scope.contact = contactPersonDetail.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(name1)":$stateParams.name1,"dto(name2)":$stateParams.name2});

  $scope.contact.$promise.then(function (results){
    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contact = results;
    console.log("==CONTROLLER CONTACTS== result detail contact:", $scope.contact);

    $scope.telecomss = results.mainData.entity.telecoms;
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


    // save contact for edit do not call service
    bridgeService.saveContact($scope.contact.mainData);

  });
})

// 
// CONTROLLER PRODUCT LIST
//
.controller('productsCtrl', function(allContact,$ionicHistory,PopupFactory,$localstorage,$filter,$ionicScrollDelegate,$scope,apiUrlLocal,$state,$ionicPopup) {
  console.log('*******************************************************');
  console.log("==CONTROLLER PRODUCTS==");

  $ionicHistory.clearHistory();   
  $scope.apiUrlLocal = apiUrlLocal;
  $scope.totalPages; 
  $scope.page = 1; 
  $scope.showSearchBar = false;
  $scope.contacts = [];
  $scope.asknext = false;
  
  // EXECUTE QUERY WITH ()
  $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});
  
  $scope.newContacts.$promise.then(function (results){
        
    // call factory to validate the response
    PopupFactory.getPopup($scope,results);
        
    console.log("results of request: ",results);
    
    $scope.contacts = (results['mainData'])['list'];
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
    console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
    
    if ($scope.contacts.length > 0 && $scope.totalPages>$scope.page) {
      $scope.asknext = true;  
    };
  })

  $scope.hideSearch = function() {
    $scope.searchKey = "";
    $scope.showSearchBar = false;
  };    


  $scope.doRefresh = function() {
    console.log('*******************************************************');
    console.log("do refresh principal");
    $scope.page=1;
    $scope.searchKey = "";
    $scope.showSearchBar = false;
    $scope.$broadcast('scroll.infiniteScrollComplete');

    // EXECUTE QUERY WITH ()
    $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});

    // primise
    $scope.newContacts.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);

      $scope.contacts = results['mainData']['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete'); 

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ($scope.contacts.length > 0 && $scope.totalPages>$scope.page) {
        $scope.asknext = true;
      };
      $ionicScrollDelegate.scrollTop();
    });
  };  

  $scope.loadMore = function() {
    console.log('*******************************************************');
    console.log("loadMore principal");
  
    $scope.page = $scope.page + 1;

    // EXECUTE QUERY WITH ()
    $scope.newContacts = allContact.query({'pageParam(pageNumber)':$scope.page});

    // promise
    $scope.newContacts.$promise.then(function(results){
    
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      console.log("results of request: ",results);
    
      $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ($scope.totalPages<=$scope.page+1) {
        $scope.asknext = false;  
      };
    });
  };


  $scope.getContactUrl = function(item){
    return '#/app/productDetail?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&name1='+item.name1+'&name2='+item.name2;  
  };

  $scope.searchcon = function(){
    $scope.showSearchBar = !$scope.showSearchBar;
  }   
            
  $scope.search = function () {
    console.log('*******************************************************');
    console.log("search function");
    $scope.contacts = [];
    $scope.showSearchBar = !$scope.showSearchBar;
    $scope.asknext = false;
    $scope.page = 1;

    // EXECUTE QUERY WITH ()
    $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.page});
    
    // PROMISE
    $scope.buscados.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);    

      console.log("results of request: ",results);

      $scope.contacts = (results['mainData'])['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
          
      if ($scope.contacts.length > 0 && $scope.totalPages>$scope.page) {
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
      console.log('*******************************************************');
      console.log("loadMore dentro search");
      console.log("trying to load more of the search",$scope.page);
      $scope.page = $scope.page +1;

      // EXECUTE QUERY WITH ()
      $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.page});

      // promise
      $scope.buscados.$promise.then(function(results){

        // call factory to validate the response
        PopupFactory.getPopup($scope,results);

        console.log("results of request: ",results);

        $scope.totalPages=parseInt((results['mainData'])['pageInfo']['totalPages']);
        $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
              
      if ($scope.totalPages<$scope.pag+1) {
        $scope.asknext = false;  
      };              
    };
  }
})