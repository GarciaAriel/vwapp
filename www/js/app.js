// Ionic Starter App
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic','ui.router','underscore', 'ngCordova', 'pascalprecht.translate', 'starter.controllers','starter.services','starter.webmailcontrollers','starter.webmailservices','starter.contactcontrollers','starter.contactservices','starter.webmailroutes','starter.contactroutes','starter.scheduleroutes'])


.run(function($ionicPlatform, $translate,$rootScope, $location, AuthenticationService, RoleService, SessionService) {

//dooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// enumerate routes that user can see
  var routesForUser = ["/app/contacts","/app/mailboxes","/app/mail-list","/app/mail-detail","/login","/app/schedulerDay"];

  // check if current location matches route  
  var routeClean = function (route) {
    // console.log("tamanooooo ",routesThatDontRequireAuth.length);
    var result = false;
    for(var i=0;i<routesForUser.length;i++) {
      console.log("route: routesForUser[i]:",route+" "+routesForUser[i]);
      if (route.indexOf(routesForUser[i]) > -1) {
        result = true;
      };
    };
    return result;
  };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    // if route requires auth and user is not logged in
    var authentication = AuthenticationService.isLoggedIn();
    if ( authentication == false ) {
      console.log("no authentication");
      // redirect back to login
      // ev.preventDefault();
      $location.path('/login');
    }
    else {
      var rout = routeClean($location.url());
      var permisos = RoleService.validateRoleAdmin(SessionService.currentUser);
      console.log("authentication true 1.ruta 2.permisos",rout+" "+permisos);
      console.log("url ",$location.url());
      if (rout == false) {
        console.log("no puede ver esta ventana");
        ev.preventDefault();
        $location.path('/app');
      }
    }  
  });
//dooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaap"); 
    // db = $cordovaSQLite.openDB({ name: "my.db" });
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    // console.log("appppppppppppppppppppppppppppppppppp"); 

          if (typeof navigator.globalization !== "undefined"){
      navigator.globalization.getPreferredLanguage(function(language) {
         //alert((language.value).split("-")[0]);
        $translate.use((language.value).split("-")[0]).then(function(data) {
        //  alert(language.value);
         // $translate.use(language.value).then(function(data) {
              console.log("SUCCESS -> " + data);
                }, function(error) {
              console.log("ERROR -> " + error);
                });
        },null);
      }


  });
})




.config(function($translateProvider) {
    $translateProvider.translations("en", {
            Login: "Log on",
            Username: "Username",
            Password:   "Password",
            Company: "Company",
            Menu: "Menu",
            Contacts:   "Contacts",
            Scheduler: "Scheduler",
            Webmail: "Webmail",
            Logout: "Log out",

        });
    $translateProvider.translations("es", {
            Login: "Ingresar",
            Username: "Usuario",
            Password: "Contraseña",
            Company: "Compania",
            Menu: "Menu",
            Contacts:   "Contactos",
            Scheduler: "Calendario",
            Webmail: "Correo",
            Logout: "Salir",
        });



     $translateProvider.translations("de", {
            Login: "Anmeldung",
            Username: "Benutzername",
            Password: "Kennwort",
            Company: "Firma",
            Menu: "Menü",
            Contacts:   "Kontakte",
            Scheduler: "Scheduler",
            Webmail: "Post",
            Logout: "aussteigen",
        });



     $translateProvider.translations("fr", {
            Login: "Connexion",
            Username: "Utilisateur",
            Password: "Mot de passe",
            Company: "Société",
            Menu: "Menu",
            Contacts:   "Contacts",
            Scheduler: "Scheduler",
            Webmail: "Courrier",
            Logout: "sortez",
        });

    $translateProvider.preferredLanguage("en");
    $translateProvider.fallbackLanguage("en");
})







.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
  })

  .state('log-out',{
      url: '/log-out',
      templateUrl: 'templates/login.html',
      controller: 'logoutController'
  })
  
  .state('app', {
    url: "/app",
    //abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })


  .state('dash', {
    url: '/dash',

        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
