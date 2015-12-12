angular.module('starter.participants',['starter.servicesProduct','starter.constantProduct'] )
 

.controller('participants', function($stateParams,participant_product,PopupFactory,list_is_empty,$localstorage,$filter,$ionicScrollDelegate,$scope,apiUrlLocal) {
  console.log('*******************************************************');
  console.log('CONTROLLER MEMBERS');

    $scope.apiUrlLocal = apiUrlLocal;
    $scope.totalPages;
    $scope.page = 1;
    $scope.searchKey = null;
    $scope.accessRight = $localstorage.getObject('accessRight');
    $scope.varCreate = $scope.accessRight.CONTACT.CREATE;
    $scope.showSearchBar = false;
    $scope.contacts = [];
    $scope.asknext = false;
    $scope.isEmptyList = "";
    //$scope.productId = $stateParams.productId;
    console.log($stateParams.productId);
    
    $scope.newContacts = participant_product.query(setParameters($scope.page,$scope.searchKey,$stateParams.productId));
      
    $scope.newContacts.$promise.then(function (results){
        
      // call factory 
      PopupFactory.getPopup($scope,results);
      console.log("results of request: ",results);
      
      $scope.contacts = (results['mainData'])['list'];
      
      $scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
      $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
      $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

      console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);

      if ($scope.contacts.length > 0 && $scope.totalPages>$scope.page) {
        $scope.asknext = true;  
      };
    })

  $scope.hideSearch = function() {
    $scope.searchKey = "";
    $scope.showSearchBar = false;
  };    


$scope.doRefresh = function(isSearchActive) {
  console.log('-------------------------------------------------------');
  console.log("do refresh");

  $scope.page=1;
  $scope.showSearchBar = false;
  $scope.asknext = false;
  $scope.$broadcast('scroll.infiniteScrollComplete');
  $scope.isEmptyList = "";

  if (!isSearchActive) { $scope.searchKey = null; }

  $scope.newContacts = participant_product.query(setParameters( $scope.page, $scope.searchKey,$stateParams.productId));

  $scope.newContacts.$promise.then(function (results){

    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.contacts = (results['mainData'])['list'];
    $scope.totalPages = parseInt((results['mainData'])['pageInfo']['totalPages']);
    $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.$broadcast('scroll.refreshComplete'); 
    $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);
      
    console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);

    if ($scope.totalPages > $scope.page) {
      $scope.asknext = true;
    };
    $ionicScrollDelegate.scrollTop();
    
  });
};  

$scope.loadMore = function() {
  console.log('-------------------------------------------------------');
  console.log("load more");

  $scope.asknext = false;
  $scope.page = $scope.page + 1;

  $scope.newContacts = participant_product.query(setParameters( $scope.page, $scope.searchKey,$stateParams.productId) );

  $scope.newContacts.$promise.then(function(results){
    
    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.totalPages=parseInt((results['mainData'])['pageInfo']['totalPages']);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.isEmptyList = list_is_empty.getMessage($filter,results['mainData']['list']);

    console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
  });
  if ($scope.totalPages > $scope.page) {
    $scope.asknext = true;  
  };
};


$scope.getContactUrl = function(item){  
  return '#/app/contactPerson?contactId='+item.customerId+'&addressId='+item.customerId+'&contactPersonId='+item.contactPersonId+'&addressType='+item.customerAddressType;  
};

$scope.searchcon = function(){
  $scope.showSearchBar = !$scope.showSearchBar;
} 

  function setParameters(page,searchKey,productId){
    var parameters = {'parameter(productId)':productId,'pageParam(pageNumber)':page};
    if (null != searchKey && "" != searchKey) {
      parameters = {'parameter(productId)':productId,'pageParam(pageNumber)':page,'parameter(participantSearch)':searchKey};
    };
    console.log("parameters to request: ",parameters);
    return parameters;
  };
                            
})
