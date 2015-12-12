
angular.module('starter.profileServices', [])

.factory('forward_update', function ($resource,FORWARD_UPDATE_URL,apiUrlLocal) {
  var url = apiUrlLocal+FORWARD_UPDATE_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
})

.factory('change_info', function ($resource,CHANGE_INFO_URL,apiUrlLocal) {
  var url = apiUrlLocal+CHANGE_INFO_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
})

.factory('my_profile', function ($resource,MY_PROFILE_URL,apiUrlLocal) {
  var url = apiUrlLocal+MY_PROFILE_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
}); 
