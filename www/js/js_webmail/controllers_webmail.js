angular.module('starter.webmailcontrollers', [])


.controller('MailsCtrl', function($scope,  MailsSubMenu,$http) {
	
  $scope.mailsSubMenu = MailsSubMenu.all();

})

.controller('MailsListCtrl', function($scope,  MailList) {
  $scope.mailList = MailList.all();
})

.controller('aloja', function($scope, $http) {
 $http.get('https://cors-test.appspot.com/test').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})


.controller('MailDetailCtrl', function($scope, $stateParams, MailList) {
  $scope.mail = MailList.get($stateParams.mailId);
});

