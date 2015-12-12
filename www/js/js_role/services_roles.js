angular.module('starter.rolesservices', [])

//SERVICE RESOURCE QUERY
.factory('LogoutService', function($resource,apiUrlLocal,pathLogout) {
  var url = apiUrlLocal+pathLogout;
  console.log('==SERVICE SCHEDULE== URL',url);
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
})

// SERVICE LOGIN SERVICE
.service('LoginService', function($q) {
    return {
        loginUser: function(name, company) {

            console.log("==SERVICE ROLE== CREATE  "+name+" service "+company+"-");
            var deferred = $q.defer();
            var promise = deferred.promise;

            // if (name == "ariel" && company == "piramide") {
                deferred.resolve('Welcome ' + name + '!');
            // } else {
                // deferred.reject('Wrong credentials.');
            // }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            
            return promise;
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
