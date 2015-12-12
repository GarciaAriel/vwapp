angular.module('starter.servicesProduct', [])

.factory('service_detail_product', function ($resource,DETAIL_PRODUCT_URL,apiUrlLocal) {
  var url = apiUrlLocal+DETAIL_PRODUCT_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
})

.factory('participant_product', function ($resource,PARTICIPANT_PRODUCT_URL,apiUrlLocal) {
  var url = apiUrlLocal+PARTICIPANT_PRODUCT_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}});
})

.factory('join_product', function ($resource,JOIN_PRODUCT_URL,apiUrlLocal) {
  var url = apiUrlLocal+JOIN_PRODUCT_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}});
})

.factory('service_list_mine', function ($resource,LIST_PRODUCT_MINE_URL,apiUrlLocal) {
  var url = apiUrlLocal+LIST_PRODUCT_MINE_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}});
})


//SERVICE RESOURCE QUERY
.factory('service_list_pruduct', function($resource,apiUrlLocal,LIST_PRODUCTS_URL) {
  var url = apiUrlLocal+LIST_PRODUCTS_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
});