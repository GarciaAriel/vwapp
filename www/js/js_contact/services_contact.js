
angular.module('starter.contactservices', [])

//MEMBER LIST SERVICE
.factory('member_list', function ($resource,MEMBERS_LIST_URL,apiUrlLocal) {
  var url = apiUrlLocal+MEMBERS_LIST_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false},
                           'save':   {method:'POST'}});
})

.factory('participant_detail', function ($resource,DETAIL_PARTICIPANT_URL,apiUrlLocal) {
  var url = apiUrlLocal+DETAIL_PARTICIPANT_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
})

.factory('member_detail', function ($resource,DETAIL_MEMBER_URL,apiUrlLocal) {
  var url = apiUrlLocal+DETAIL_MEMBER_URL;
  return $resource(url,{},{'query':{method:'GET', isArray:false} });
})

.directive('focus',
  function($timeout) {
    return {
      scope : {
        trigger : '@focus'
      },
      link : function(scope, element) {
        scope.$watch('trigger', function(value) {
          if (value === "true") {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  }
)

.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
}); 
