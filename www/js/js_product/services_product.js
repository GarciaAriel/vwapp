angular.module('starter.scheduleservices', [])

//SERVICE RESOURCE QUERY
.factory('service_pruducts_list', function($resource,apiUrlLocal,LIST_PRODUCTS_URL) {
  console.log('*******************************************************');
  console.log('==SERVICE PRODUCTS LIST==');
  var url = apiUrlLocal+LIST_PRODUCTS_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
});