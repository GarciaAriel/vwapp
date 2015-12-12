angular.module('starter.listProduct',['starter.constantProduct','starter.servicesProduct'] )
// 
// CONTROLLER PRODUCT LIST
//
.controller('productsCtrl', function($timeout, service_list_pruduct,service_list_mine,list_is_empty,PopupFactory,$filter,$ionicScrollDelegate,$scope,apiUrlLocal,$ionicPopup) {

  console.log('*******************************************************');
  console.log("==CONTROLLER PRODUCTS LIST==");

  $scope.apiUrlLocal = apiUrlLocal;
  $scope.totalPages; 
  $scope.page = 1; 
  $scope.searchKey = null;
  $scope.showSearchBar = false;
  $scope.products = [];
  $scope.asknext = false;
  $scope.isEmptyList = "";
  $scope.isCurrentActive ="tab-item active";
  $scope.isMineActive ="tab-item";
  $scope.isArchiveActive ="tab-item";

  $scope.tabList = 1;

  // EXECUTE QUERY WITH ()
  if ($scope.tabList == 2) {
    $scope.newProducts = service_list_mine.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
  }else{
    $scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
  }
  
  
  $scope.newProducts.$promise.then(function (results){
        
    // call factory to validate the response
    PopupFactory.getPopup($scope,results);
    
    $scope.products = (results['mainData'])['list'];
    $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
    $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

    console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
    
    if ( $scope.totalPages > $scope.page ) {
      $scope.asknext = true;  
    };
  })

  $scope.hideSearch = function() {
    $scope.searchKey = null;
    $scope.showSearchBar = false;
  }

  $scope.searchIcon = function(){
    $scope.showSearchBar = !$scope.showSearchBar;
  }

  $scope.getProductUrl = function(item){
    return '#/app/productDetail?productId='+item.productId+'&productName='+item.productName;
  }

  $scope.mySplit = function(string, nb) {
    $scope.array = string.split(' ');
    return $scope.result = $scope.array[nb];
  }

  $scope.doRefresh = function(isSearchActive) {
    console.log('-------------------------------------------------------');
    console.log("do refresh");

  //$scope.products = [];

    $scope.apiUrlLocal = apiUrlLocal;
    $scope.page=1;
    $scope.showSearchBar = false;
    $scope.asknext = false;
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.isEmptyList = "";
    
    console.log("-------------******** isSearchActive",isSearchActive);
    if (!isSearchActive) { $scope.searchKey = null; }
    console.log("-------------******** searchKey",$scope.searchKey);

    // EXECUTE QUERY WITH ()
    if ($scope.tabList == 2) {
      $scope.newProducts = service_list_mine.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    }else{
      $scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    }
   //$scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey));

    // primise
    $scope.newProducts.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      $scope.products = results['mainData']['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete'); 
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);
      if ($scope.isEmptyList != "") {
        $scope.searchKey = null;
      };

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
    
      if ($scope.totalPages > $scope.page) {
        $scope.asknext = true;
      };

      $ionicScrollDelegate.scrollTop();
      //$ionicScrollDelegate.scrollTop();
      //$scope.$broadcast('scroll.refreshComplete');
    });
    if ($scope.isEmptyList != "") {
      $scope.searchKey = null;
    };

  };

  $scope.loadMore = function() {
    console.log('-------------------------------------------------------');
    console.log("load More");
  
    $scope.asknext = false;  
    $scope.page = $scope.page + 1;
    
    // EXECUTE QUERY WITH ()
    if ($scope.tabList == 2) {
      $scope.newProducts = service_list_mine.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    }else{
      $scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    }
    //$scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey));

    // promise
    $scope.newProducts.$promise.then(function(results){
    
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      $scope.products = $scope.products.concat((results['mainData'])['list']);
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      $scope.$broadcast('scroll.infiniteScrollComplete');

    });

    if ($scope.totalPages > $scope.page) {
      $scope.asknext = true;  
    };
  };

  $scope.currentEvent = function(){
    console.log("currenttttttttttttttt");
    $scope.isCurrentActive ="tab-item active";
    $scope.isMineActive ="tab-item";
    $scope.isArchiveActive ="tab-item";
   
    $scope.page = 1; 
    $scope.asknext = false;
    $scope.searchKey = null;
    $scope.tabList = 1;

    // EXECUTE QUERY WITH ()
    $scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    
    $scope.newProducts.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      $scope.products = (results['mainData'])['list'];
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ( $scope.totalPages > $scope.page ) {
        $scope.asknext = true;  
      };
    })
    
  };

  $scope.mineEvent = function(){
    console.log("mine");
    $scope.isCurrentActive ="tab-item";
    $scope.isMineActive ="tab-item active";
    $scope.isArchiveActive ="tab-item";

    $scope.page = 1; 
    $scope.asknext = false;
    $scope.searchKey = null;
    $scope.tabList = 2;

    // EXECUTE QUERY WITH ()
    $scope.newProducts = service_list_mine.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    
    $scope.newProducts.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      $scope.products = (results['mainData'])['list'];
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ( $scope.totalPages > $scope.page ) {
        $scope.asknext = true;  
      };
    })
  };

  $scope.archiveEvent = function(){
    console.log("archive");
    $scope.isCurrentActive ="tab-item";
    $scope.isMineActive ="tab-item";
    $scope.isArchiveActive ="tab-item active";

    $scope.page = 1; 
    $scope.asknext = false;
    $scope.searchKey = null;
    $scope.tabList = 3;

    // EXECUTE QUERY WITH ()
    $scope.newProducts = service_list_pruduct.query(setParameters($scope.page,$scope.searchKey,$scope.tabList));
    
    $scope.newProducts.$promise.then(function (results){
          
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);
      
      $scope.products = (results['mainData'])['list'];
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ( $scope.totalPages > $scope.page ) {
        $scope.asknext = true;  
      };
    })

  };

  function setParameters(page,searchKey,tabList){
    var parameters = {'pageParam(pageNumber)':page};

    if (tabList == 1) {
      parameters = {'pageParam(pageNumber)':page};

      if (null != searchKey && "" != searchKey) {
        parameters = {'pageParam(pageNumber)':page,'parameter(productName)':searchKey};
      };
    };

    if (tabList == 2) {
      parameters = {'pageParam(pageNumber)':page};

      if (null != searchKey && "" != searchKey) {
        parameters = {'pageParam(pageNumber)':page,'parameter(productName)':searchKey};
      };
    };

    if (tabList == 3) {
      parameters = {'pageParam(pageNumber)':page,'isArchiveEvents':true};
      
      if (null != searchKey && "" != searchKey) {
        parameters = {'pageParam(pageNumber)':page,'parameter(productName)':searchKey,'isArchiveEvents':true};
      };
    };
    
    console.log("parameters to request: ",parameters);
    return parameters;
  };

})