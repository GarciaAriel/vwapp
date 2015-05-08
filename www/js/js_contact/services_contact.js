
angular.module('starter.contactservices', [])

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
}])

.service('bridgeService', function() {
  var contact = {};

  var saveContact = function(newContact) {
      contact = newContact;
  };

  var getContact = function(){
      return contact;
  };

  return {
    saveContact: saveContact,
    getContact: getContact
  };

})

.factory('Contact', function ($resource,apiUrlLocal,pathContact) {
	var url = apiUrlLocal+pathContact;
	return $resource(url,{},{'query':{method:'GET', isArray:false}});
});
