angular.module('starter.services', [])

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
