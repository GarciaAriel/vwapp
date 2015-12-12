angular.module('starter.detailProduct',['starter.constantProduct','starter.servicesProduct'] )

// 
// CONTROLLER PRODUCT DETAIL
//
.controller('ProductDetail_Controller', function($filter,$ionicPopup,$http,JOIN_PRODUCT_URL, service_detail_product,join_product,$state,PopupFactory,$scope,$stateParams,apiUrlLocal) {
  console.log('*******************************************************');
  console.log("==CONTROLLER PRODUCTS DETAIL==");
  console.log("state params product id: ",$stateParams.productId);
  console.log("state params product name: ",$stateParams.productName);

  $scope.myActiveSlide = 0;
  $scope.apiUrlLocal = apiUrlLocal;
  
  // EXECUTE QUERY WITH (productId , productName)
  $scope.contact = service_detail_product.get({'productId': $stateParams.productId, "dto(productId)": $stateParams.productId, "dto(productName)": $stateParams.productName});

  // promise
  $scope.contact.$promise.then(function (results){
    
    // call factory to validate the response
    PopupFactory.getPopup($scope,results);

    console.log("results of request: ",results);

    $scope.entity = results.mainData.entity;

    $scope.productGroup = results.mainData.productGroupArray.filter(function ( obj ) {
      return obj.productGroup === $scope.entity.productGroup;
    })[0];

    $scope.productType = results.mainData.productTypeArray.filter(function ( obj ) {
      return obj.productTypeId === $scope.entity.productTypeId;
    })[0];

    $scope.vatType = results.mainData.vatArray.filter(function ( obj ) {
      return obj.vatId === $scope.entity.vatId;
    })[0];

    $scope.help = ['help'];
    $scope.iframeWidth = $(window).width();
    $scope.boolPicture = false;
    if (results.mainData.productPictureArray.length > 0) {
      $scope.productPictureArray = results.mainData.productPictureArray;
      $scope.productPictureDefault = $scope.productPictureArray[0];  
      $scope.boolPicture = true;
    }

    ////////////////////////
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });

    var geocoder = new google.maps.Geocoder();
    var address = $scope.entity.eventAddress;
    geocodeAddress(geocoder, map, address);

    $scope.map = map;
    ////////////////////////
    
    var cadena = $scope.entity.endDateTimeFormated;
    $scope.array = cadena.split(' ');
    $scope.endHour = $scope.array[1];

    var date = new Date(  parseInt($scope.entity.initDateTime) );
    var numDay = date.getDay();
    console.log("----------",numDay);
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    $scope.stringDay = weekday[numDay]; 
    console.log("----------",$scope.stringDay);
  
  });

  ////////////////////////
  function geocodeAddress(geocoder, resultsMap,address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  
$scope.linkMaps = function(latitude, longitude){

}


  ///////////////////////

  $scope.getParticipantsUrl = function(productId){  
    //return '#/app/participants?productId=' + productId;  
    $state.go('app.participants',{'productId': productId }); 

  };

  $scope.joinProduct = function(productId){  
    console.log(productId);
    // A confirm dialog
    var confirmPopup = $ionicPopup.confirm({
      title: $filter('translate')('Registration'),
      template: $filter('translate')('RegisterConfirm')
     });
     confirmPopup.then(function(res) {
       if(res) {

        // Simple POST request
        $http({
          method: 'POST',
          url: apiUrlLocal+""+JOIN_PRODUCT_URL,
          data: {"dto(productId)":productId}
        }).success(function(data, status, headers, config) {

          // call factory 
          PopupFactory.getPopup($scope,data);
          $scope.entity.isParticipant = "true";
          
        }).
        error(function(data, status, headers, config) {
         console.log('==CONTROLLER LOGIN== REQUEST SUCCESS ERROR', data);
        });
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   
    
  };
  

})