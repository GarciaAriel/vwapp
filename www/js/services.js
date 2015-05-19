angular.module('starter.services', [])

// HELP SERVICE LOCAL STORAGE
.factory('ControlError', ['$window', function($ionicPopup, $window) {
  
  return {
    review: function(result) {

      if (result.errorsArray != undefined) {

        var message = result.errorsArray[0].error;
        console.log("aaaaaaaaa----",message);
        
        var alertPopup = $ionicPopup.alert({
          title: 'Don\'t eat that!',
          template: 'It might taste good'
        });

        return alertPopup;
      }
      
      
    }
  }
}])

.factory("PopupFactory", function ($ionicPopup) {
  
   function getPopup(scope,result) {
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
   }
       
   return {
       getPopup: getPopup
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

     //  // optional method
     // 'requestError': function(rejection) {
     //    // do something on error
     //    if (canRecover(rejection)) {
     //      return responseOrNewPromise
     //    }
     //    return $q.reject(rejection);
     //  },



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
  });
