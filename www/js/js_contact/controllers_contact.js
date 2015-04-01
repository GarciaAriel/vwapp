//angular.module('starter.contactcontrollers', [])
//
//// .controller('ContactsCtrl', function($scope, Contacts) {
////   $scope.contacts = Contacts.all();
//// })
//
//.controller('ContactsCtrl', function($scope, contacts, $ionicLoading){
//    $scope.contacts = contacts.list;
//
//    $scope.addContact = function(){
//        contacts.add().then(function(){
//            $scope.$broadcast('scroll.refreshComplete');
//        });
//    };
//
//    $ionicLoading.show({
//        template: '<i class="ion-load-c"></i><br/>Cargando...'
//    });
//    contacts.ready.then(function(){
//        $ionicLoading.hide();
//    });
//
//})



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


.controller('ContactsCtrl', function($scope, Contact,$timeout) {
  $scope.page = 1;
  $scope.contacts = Contact.query({'pageParam(pageNumber)':$scope.page});
  
  $scope.doRefresh = function() {
    $scope.page = 1;
    $scope.contacts = Contact.query({'pageParam(pageNumber)':$scope.page});

    $scope.contacts.$promise.then(function (results){
      $scope.contacts = results;
      $scope.$broadcast('scroll.refreshComplete');  
    });
  };

  
  $scope.loadMore = function() {
    console.log('Loading more!');
    $scope.page = $scope.page + 1;
    $scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});
    $scope.newContacts.$promise.then(function(results){
      $scope.contacts = $scope.contacts.concat(results);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    
    
  }


})

//
// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
//   console.log("Controller CONTACTS get all",$scope.contacts);
//
//   $scope.searchcon = function(){
//     alert("button searchcon pressed");
//   };
//
//   $scope.addper = function(){
//     alert("button addper pressed");
//   };
//
//   $scope.addcom = function(){
//     alert("button addcom pressed");
//   };
//
// })




// .controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
//   $scope.contact = Contacts.get($stateParams.contactId);
// })


.controller('ContactDetailCtrl', function($scope, contact, contacts, $ionicActionSheet){
    $scope.contact = contact;

    $scope.borrarPersona = function(){
    $ionicActionSheet.show({
        destructiveText: 'Delete ' + contact.name.first +" " +contact.name.last,
        cancelText: 'Cancel',
        destructiveButtonClicked: function(){
            contacts.list.splice(contacts.list.indexOf(contact),1);
            window.history.back();
        }
    });
    };
});
