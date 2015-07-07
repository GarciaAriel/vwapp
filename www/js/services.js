angular.module('starter.services', [])

.factory("PopupFactory", function ($ionicHistory,$ionicPopup,$state,$filter) {
  
  function getPopup(scope,result) {

      // if session Expired
      if (result.forward == "SessionExpired") {
        console.log("==ERROR CONTROL== session expired:",result);
        
        return $ionicPopup.show({
         
          title: "Error",
          template: "Session Expired",
          scope: scope,
          buttons: [
            { text: '<b>close</b>',
              type: 'button-positive',
              onTap: function(e) {
                $state.go('login');  
              }
            },
          ]
        })
      };

      // if Concurrency fail
      if (result.forward == "ConcurrencyFail") {
        console.log("==ERROR CONTROL== Concurrency Fail:",result);
        
        return $ionicPopup.show({
         
          title: $filter('translate')('Error'),
          template:  $filter('translate')('ConcurrencyFail'),
          scope: scope,
          buttons: [
            { text: '<b>close</b>',
              type: 'button-positive',
              onTap: function(e) {
                $ionicHistory.goBack();
              }
            },
          ]
        })
      };
      
      if (result.errorsArray) {
        console.log("==ERROR CONTROL== errors array:",result);
        var message = result.errorsArray[0].error;
        for (var i = 1; i < result.errorsArray.length; i++) {
          message=message+"<br>"+result.errorsArray[i].error ;
        };
        return $ionicPopup.show({
         
         title: 'Error',
         template: message,
         scope: scope,
         buttons: [
           { text: '<b>OK</b>',
           type: 'button-positive'
         },
           
         ]
        })  
      };

      console.log("==ERROR CONTROL== no problems");
  }
       
   return {
       getPopup: getPopup
   };  

})

.service('factoryAccessRight', function($localstorage) {
  console.log('*******************************************************');
  console.log('==FACTORY ACCESS RIGHT==');

  // GET ACCESS RIGHT FROM LOCAL STORAGE
  var accessRight = $localstorage.getObject('accessRight');
  console.log('Access Right',accessRight);
  
  var getAccessRight = function(modulo,type) {
    console.log('*******************************************************');
    console.log('==FACTORY ACCESS RIGHT==');
    console.log("modulo: "+modulo+" type: "+type);

    // get value
    var res = accessRight[modulo][type];
    console.log('result of access right: ',res);

    // response boolean
    var result = res == 'true' ? true : false;
    return result;
  };

  return {
    getAccessRight: getAccessRight
  };
})

.factory('myHttpInterceptor', function($q,$location,$injector) {
  return {
    'request': function(config) {
      $injector.get("$ionicLoading").show({
        template: '<i class="icon ion-loading-d" style="font-size: 32px"></i>',
        animation: 'fade-in',
        noBackdrop: false
      });
      return config;
    },

    // optional method
    'response': function(response) {
      $injector.get("$ionicLoading").hide();
      return response;
    },

    // optional method
    'responseError': function(rejection) {
      $injector.get("$ionicLoading").hide();
      // do something on error
      if (rejection.status == 302){
        $location.path('/login');
      }
      // if (canRecover(rejection)) {
      //   return responseOrNewPromise
      // }
      return $q.reject(rejection);
    }
  };
})

// HELP SERVICE LOCAL STORAGE
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);