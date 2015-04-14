// Ionic Starter App
    // var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic','starter.constants','ui.router','starter.rolesroutes','starter.scheduleroutes','underscore', 'ngCordova', 'pascalprecht.translate', 'starter.controllers','starter.services','starter.contactcontrollers','starter.contactservices','starter.webmailroutes','starter.contactroutes','ngResource'])

.run(function($ionicPlatform, $translate,$rootScope, $location, AuthenticationService, RoleService, SessionService) {

  // enumerate routes that user can see 
  var routesForUser = ["/app","app/contacts","app/contact","/app/mailboxes","/app/mail-list","/mail-detail","/login","/app/schedulerDay"];

  // VALIDATE THE CURRENT RUOTE
  var validateRoute = function (route) {
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

    // IF AUTHENTICATION IS FALSE GO TO LOGIN
    // var authentication = AuthenticationService.isLoggedIn();
    // if ( authentication == false ) {
    //   console.log("==VALIDATE ROUTE== USER NO AUTHENTICATION");
    //   $location.path('/login');
    // }
    // else {
      console.log("==VALIDATE ROUTE== AUTHENTICATION TRUE");
      //VALIDATE ROUTE
      var rout = validateRoute($location.url());
      console.log("==VALIDATE ROUTE== URL LOCATION: ",$location.url());

      var permisos = RoleService.validateRoleAdmin(SessionService.currentUser);
      
      //IF VALIDATE ROUTE FALSE GO TO /app
      if (rout == false) {
        console.log("==VALIDATE ROUTE== YOU CAN NOT SEE THIS WINDOW");
        ev.preventDefault();
        $location.path('/app');
      }
    // }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
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
});
