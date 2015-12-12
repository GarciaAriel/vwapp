angular.module('starter.contactPersonBranch',['starter.branch_services','starter.constants_branch'] )
 

.controller('contactPersonBranch', function($stateParams,contact_person_branch,PopupFactory,list_is_empty,$filter,$localstorage,$ionicScrollDelegate,$scope,apiUrlLocal,$state) {
  console.log('*******************************************************');
  console.log('CONTROLLER MEMBERS');

    $scope.apiUrlLocal = apiUrlLocal;
    $scope.totalPages;
    $scope.page = 1;
    $scope.searchKey = null;
    $scope.accessRight = $localstorage.getObject('accessRight');
    $scope.varCreate = $scope.accessRight.CONTACT.CREATE;
    $scope.showSearchBar = false;
    $scope.apiUrlLocal = apiUrlLocal;
    $scope.contacts = [];
    $scope.asknext = false;
    $scope.isEmptyList = "";

    console.log("aaaa vamos",$stateParams.branchId);
    console.log("aaaa vamos",$stateParams.branchName);
    $scope.branchName = $stateParams.branchName;
    
    $scope.newContacts = contact_person_branch.query(setParameters($scope.page,$scope.searchKey));
      
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
  $scope.isEmptyList = "";
  $scope.$broadcast('scroll.infiniteScrollComplete');

  if (!isSearchActive) { $scope.searchKey = null; }

  $scope.newContacts = contact_person_branch.query(setParameters($scope.page,$scope.searchKey));

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

  $scope.newContacts = contact_person_branch.query(setParameters($scope.page,$scope.searchKey) );

  $scope.newContacts.$promise.then(function(results){
    
    // call factory 
    PopupFactory.getPopup($scope,results);

    $scope.page=parseInt((results['mainData'])['pageInfo']['pageNumber']);
    $scope.totalPages=parseInt((results['mainData'])['pageInfo']['totalPages']);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);

    $scope.$broadcast('scroll.infiniteScrollComplete');
    console.log("page number: "+$scope.page+" total pages: "+$scope.totalPages);
      
  });
  if ($scope.totalPages > $scope.page) {
    $scope.asknext = true;  
  };
};


$scope.getContactUrl = function(item){  
  console.log("companyId",item.companyId);
  console.log("memberAddressId",item.memberAddressId);
  console.log("addressType",item.addressType);
  $state.go('app.brachDetail',{'contactId': item.memberAddressId,'addressId': item.memberAddressId,'contactPersonId': item.memberContactPersonId,'addressType': item.addressType}); 
  
};

$scope.searchcon = function(){
  $scope.showSearchBar = !$scope.showSearchBar;
} 

  function setParameters(page,searchKey){
    var parameters = {'parameter(branchId)':$stateParams.branchId,'pageParam(pageNumber)':page};
    if (null != searchKey && "" != searchKey) {
      parameters = {'parameter(branchId)':$stateParams.branchId,'pageParam(pageNumber)':page,'parameter(memberSearch)':searchKey};
    };
    console.log("parameters to request: ",parameters);
    return parameters;
  };
                            
})
