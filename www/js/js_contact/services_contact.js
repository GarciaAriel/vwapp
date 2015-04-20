
angular.module('starter.contactservices', [])

.factory('Contact', function ($resource,apiUrlLocal,pathContact) {
	var url = apiUrlLocal+pathContact;
	return $resource(url,{},{'query':{method:'GET', isArray:false}});
});
