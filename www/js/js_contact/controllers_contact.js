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


.controller('ContactsCtrl', function($scope, Contact,$timeout,$ionicLoading) {

  //LOADING ICON
  // $ionicLoading.show({
  //   template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
  //   animation: 'fade-in',
  //   noBackdrop: false
  // })

$scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});
$scope.contacts = [];
//    $scope.pagei= $scope.newContacts['mainData'];
//    console.log("pagina",$scope.pagei);

console.log("que esta llenando",$scope.newContacts);
$scope.pageini = 1;

$scope.newContacts.$promise.then(function (results){
  console.log("inicio",(results['mainData']));
  console.log("==CONTROLLER CONTACTS== LOAD CONTACT FIRST TIME");
  $scope.contacts = (results['mainData'])['list'];
  
//      console.log('pagina de llegada',$scope.pagina);
console.log('lista de contactos',$scope.contacts);
$scope.page = parseInt((results['mainData'])['pageInfo']['pageNumber']);
console.log("pagina parseada", $scope.page);
//    $scope.page = $scope.page + 1;
console.log("esta pagina que hace", $scope.page);
    // $ionicLoading.hide();
  });
//  };

$scope.doRefresh = function() {
  
//  $scope.page = 1;
$scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.pageini});

$scope.newContacts.$promise.then(function (results){
  console.log("page doRefresh", $scope.page);
  $scope.contacts = (results['mainData'])['list'];
  $scope.$broadcast('scroll.refreshComplete'); 
  console.log('volvi a la lista de inicio',$scope.pageini);
  $scope.page=1;
  
  console.log('empezar desde',$scope.pageini);
});
};  

$scope.loadMore = function() {
  console.log('==CONTROLLER CONTACTS==Loading more');
  $scope.page = $scope.page + 1;
  $scope.newContacts = Contact.query({'pageParam(pageNumber)':$scope.page});
  $scope.newContacts.$promise.then(function(results){
    console.log("nueva lista de contactos",(results['mainData']));
    console.log("page  loadMore", $scope.page);
    $scope.contacts = $scope.contacts.concat((results['mainData'])['list']);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  });
};

$scope.getContactUrl = function(item){

  return item.contactPersonAddressId ==='' ? '#/app/contact?contactId=' +item.addressId +'&addressId='+ item.addressId + '&addressType=' + item.addressType : '#/app/contact?contactId='+item.contactPersonAddressId+'&addressId='+item.contactPersonAddressId+'&contactPersonId='+item.addressId+'&addressType='+item.addressType2;
};



$scope.searchcon = function(){
//        

alert("button searchcon pressed");
$scope.myValue = true;

}
//    

$scope.searchKey = "";
//
$scope.clearSearch = function () {
  $scope.searchKey = "";
  $scope.buscados = Contact.query();
  console.log("no limpia el texto",$scope.buscados);
}

$scope.search = function () {
  $scope.buscados = Contact.query({'parameter(contactSearchName)':$scope.searchKey});
//            console.log("primer buscado query",$scope.buscados);

//             $scope.contacts = $scope.buscados((['mainData'])['list']);



$scope.buscados.$promise.then(function (results){

  $scope.contacts = (results['mainData'])['list'];
  
  
  console.log("LOS CONTACTOS DE BUSQUEDA", $scope.contacts);
  
}
)}

//        $scope.employees = Employees.query();






})

//
// .controller('ContactsCtrl', function($scope, Contacts) {
//   $scope.contacts = Contacts.all();
//   console.log("Controller CONTACTS get all",$scope.contacts);
//

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


//.controller('ContactDetailCtrl', function($scope, contact, contacts, $ionicActionSheet){
//    $scope.contact = contact;
//        
////    $scope.borrarPersona = function(){
////    $ionicActionSheet.show({
////        destructiveText: 'Delete ' + contact.name.first +" " +contact.name.last,
////        cancelText: 'Cancel',
////        destructiveButtonClicked: function(){
////            contacts.list.splice(contacts.list.indexOf(contact),1);
////            window.history.back();
////        }
////    });
////    };
//    
//    
//    
//});



.controller('ContactCtrl', function($scope, $stateParams, Contact) {

  console.log("param1", $stateParams.contactId);
  console.log("param2", $stateParams.addressId);
  console.log("param3", $stateParams.contactPersonId);
  console.log("param4", $stateParams.addressType);


  $scope.contact = Contact.get({contactId: $stateParams.contactId, "dto(addressId)": $stateParams.addressId, "dto(contactPersonId)": $stateParams.contactPersonId, "dto(addressType)": $stateParams.addressType});

  $scope.contact.$promise.then(function (results){

    $scope.contact = results;
           // console.log("sasasa",((results['mainData'])['entity']).addressId);
//        $ionicLoading.hide();


$scope.telecomss=results.mainData.entity.telecoms;
console.log("list of telecoms",$scope.telecomss);



});


  

  console.log("este contacto",$scope.contact);
  




//      $scope.dcontact = $scope.contact((results['mainData'])['entity']);
//        $scope.info2 = parseInt((results['mainData'])['pageInfo']['pageNumber']);
//        var prueba = (results['mainData'])['pageInfo']['pageNumber'];

//      $scope.$broadcast('scroll.refreshComplete');  
//        console.log("DATOS del contacto",$scope.dcontact);




});





