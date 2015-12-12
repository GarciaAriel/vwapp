angular.module('starter.branch_services', [])

//SERVICE QUERY BRANCH LIST
.factory('service_branch_list', function($resource,apiUrlLocal,BRANCH_LIST_URL) {
  console.log('*******************************************************');
  console.log('==SERVICE BRANCHS LIST==');
  var url = apiUrlLocal+BRANCH_LIST_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false}}); 
})

// SERVICE QUERY CONTACT PERSON IN BRANCH
.factory('contact_person_branch', function ($resource,CONTACT_PERSON_BRANCH_URL,apiUrlLocal) {
  var url = apiUrlLocal+CONTACT_PERSON_BRANCH_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false},
                           'save':   {method:'POST'}});
})

//SERVICE QUERY DETAIL CONTACT PERSON EN BRANCH
.factory('detail_contact_person_branch', function ($resource,DETAIL_CONTACT_PERSON_BRANCH_URL,apiUrlLocal) {
  var url = apiUrlLocal+DETAIL_CONTACT_PERSON_BRANCH_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
});