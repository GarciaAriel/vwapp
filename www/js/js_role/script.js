
var app = angular 
  .module('MyApp', [
    'ui.router'
  ])

.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        // States
        $stateProvider
          
          // public
          .state('home', {
              url: "/home",
              templateUrl: 'templates/tpl.html',
              data: { isPublic: true },
          })
          .state('public', {
              url: "/public",
              templateUrl: 'templates/tpl.html',
              data: { isPublic: true },
          })
          // private
          .state('private', {
              url: "/private",
              templateUrl: 'templates/tpl.html',
          })
          .state('private2', {
              url: "/private2",
              templateUrl: 'templates/tpl.html',
          })
          
          // login
          .state('login', {
              url: "/login",
              templateUrl: 'templates/tpl.html',
              data: { isPublic: true },
              controller: 'loginCtrl',
          })
    }
])
app.controller('loginCtrl', function ($scope, userService) {
    userService
      .getAuthObject()
      .then(function (user) { $scope.user = user });
})

app.run(['$rootScope', '$state', 'userService',
 function ($rootScope, $state, userService) {

     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        // if already authenticated...
        var isAuthenticated = userService.isAuthenticated();
        // any public action is allowed
        var isPublicAction = angular.isObject(toState.data)
                           && toState.data.isPublic === true;

        if (isPublicAction || isAuthenticated) {
          return;
        }

        // stop state change
        event.preventDefault();

        // async load user 
        userService
           .getAuthObject()
           .then(function (user) {

              var isAuthenticated = user.isAuthenticated === true;

              if (isAuthenticated) {
                // let's continue, use is allowed
                $state.go(toState, toParams)
                return;
              }

              // log on / sign in...
              $state.go("login");
           })
     });
 }])
.factory('userService', function ($timeout, $q) {

    var user = undefined;

    return {
        // async way how to load user from Serve
        getAuthObject: function () {
            var deferred = $q.defer();
            
            // later we can use this quick way -
            // - once user is already loaded
            if (user) {
                return $q.when(user);
            }

            // server fake call
            $timeout(function () {
                // server returned UN authenticated user
                user = {isAuthenticated: false };
                // here resolved after 500ms
                deferred.resolve(user)
            }, 500)

            return deferred.promise;
        },
        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
            return user !== undefined
                && user.isAuthenticated;
        }
    };

})
app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ])