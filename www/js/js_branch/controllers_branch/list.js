angular.module('starter.branchList',['starter.constants_branch','starter.branch_services'] )

// 
// CONTROLLER PRODUCT LIST
//
.controller('branch_list', function(service_branch_list,PopupFactory,list_is_empty,$filter,$ionicScrollDelegate,$scope,apiUrlLocal,$state) {
  console.log('*******************************************************');
  console.log("==CONTROLLER PRODUCTS==");

  $scope.apiUrlLocal = apiUrlLocal;
  $scope.totalPages; 
  $scope.page = 1; 
  $scope.showSearchBar = false;
  $scope.products = [];
  $scope.asknext = false;
  $scope.searchKey = "";
  $scope.isEmptyList = "";
  
  // EXECUTE QUERY WITH ()
  $scope.newProducts = service_branch_list.query(setParameters($scope.page,$scope.searchKey) );
  
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
    $scope.searchKey = "";
    $scope.showSearchBar = false;
  };    

  $scope.doRefresh = function(isSearchActive) {
    console.log('-------------------------------------------------------');
    console.log("do refresh principal");
    $scope.page=1;
    $scope.showSearchBar = false;
    $scope.asknext = false;
    $scope.isEmptyList = "";
    $scope.$broadcast('scroll.infiniteScrollComplete');

    if (!isSearchActive) { $scope.searchKey = null; }

    // EXECUTE QUERY WITH ()
    $scope.newProducts = service_branch_list.query(setParameters($scope.page,$scope.searchKey) );

    // primise
    $scope.newProducts.$promise.then(function (results){

      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      $scope.products = results['mainData']['list'];
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.refreshComplete'); 
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ( $scope.totalPages > $scope.page ) {
        $scope.asknext = true;
      };
      $ionicScrollDelegate.scrollTop();
    });
    $ionicScrollDelegate.scrollTop();
  };  

  $scope.getProductUrl = function(item){
    return '#/app/productDetail?productId='+item.productId+'&productName='+item.productName;
  };

  $scope.loadMore = function() {
    console.log('-------------------------------------------------------');
    console.log("load more");
  
    $scope.page = $scope.page + 1;
    
    // EXECUTE QUERY WITH ()
    $scope.newProducts = service_branch_list.query(setParameters($scope.page,$scope.searchKey) );

    // promise
    $scope.newProducts.$promise.then(function(results){
    
      // call factory to validate the response
      PopupFactory.getPopup($scope,results);

      $scope.products = $scope.products.concat((results['mainData'])['list']);
      $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
      if ($scope.totalPages<$scope.page+1) {
        $scope.asknext = false;  
      };

    });
  };

  $scope.searchcon = function(){
    $scope.showSearchBar = !$scope.showSearchBar;
  }   

  function setParameters(page,searchKey){
    var parameters = {'pageParam(pageNumber)':page};
    if (null != searchKey && "" != searchKey) {
      parameters = {'pageParam(pageNumber)':page,'parameter(branchName)':searchKey};
    };
    console.log("parameters to request: ",parameters);
    return parameters;
  };
    
})