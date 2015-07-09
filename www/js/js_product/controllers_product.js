angular.module('starter.productsController',[] )

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


  $scope.getContactUrl = function(item,type){
    return '#/app/contactPerson?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&name1='+item.name1+'&name2='+item.name2;  
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

    // EXECUTE QUERY WITH ()
    $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey});
    
    // PROMISE
    $scope.buscados.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);    

      console.log("results of request: ",results);

      $scope.contacts = (results['mainData'])['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
          
      if ($scope.contacts.length > 0 && $scope.totalPages>$scope.pag) {
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
      $scope.buscados = allContact.query({'parameter(contactSearchName)':$scope.searchKey,'pageParam(pageNumber)':$scope.pag});

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