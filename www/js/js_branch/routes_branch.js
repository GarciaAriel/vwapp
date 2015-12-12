
angular.module('starter.branchRoutes', ['starter.branchList','starter.contactPersonBranch','starter.branchDetail'])

.config(function($stateProvider, $urlRouterProvider) {

  // route branch list
  $stateProvider.state('app.branchs', {
    url: '/branchs',
    cache: true,
    views: {
      'menuContent': {
       controller: 'branch_list',
       templateUrl: 'templates/views_branch/list.html'
      }
    }
  })

  // route contact person en branch
  $stateProvider.state('app.contactPersonBranch', {
    url: '/contactPersonBranch?branchId&branchName',
    cache: true,
    views: {
      'menuContent': {
       controller: 'contactPersonBranch',
       templateUrl: 'templates/views_branch/contactPersonList.html'
      }
    }
  })

  // route detail contact person in branch
  $stateProvider.state('app.brachDetail', {
    url: "/branchDetail?contactId&addressId&contactPersonId&addressType",
    cache: true,
    views: {
      'menuContent': {
       controller: 'branch_detail',
       templateUrl: 'templates/views_branch/detail.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  
});
