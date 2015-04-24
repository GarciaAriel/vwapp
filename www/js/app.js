// Ionic Starter App
    // var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic','starter.constants','ui.router','starter.rolesroutes','starter.scheduleroutes','underscore', 'ngCordova', 'pascalprecht.translate', 'starter.controllers','starter.services','starter.webmailroutes','starter.contactroutes','ngResource'])

.run(function($ionicPlatform, $translate,$rootScope, $location, AuthenticationService, RoleService, SessionService) {

  
  // enumerate routes that user can see 
  var routesForUser = ["/logout","/dos","/app","app/contacts","app/contact","/app/mailboxes","/app/mail-list","/mail-detail","/login","/app/schedulerDay","/app/schedulerDetail", "/log-out","/app/newperson"];

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
        $location.path('/login');
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
      Detail: "Detail",
      Address: "Address",
      Street: "Street",
      Zip: "Zip",
      City: "City",
      Communication: "Communication",
      Info: "Info",
      Search: "Search",
      Previous: "Previous",
      Today: "Today",
      Next: "Next",
      Month: "Month",
      Week: "Week",
      Day: "Day",
      AppointmentDetail: "Appointment Detail",
      Title: "Title",
      Type: "Type",
      Priority: "Priority",
      StartDate: "Start Date",
    Thisisanalldayappointment: "This is an all day appointment", 
      EndDate: "End Date",
      Recurrent: "Recurrent",
      Location: "Location",
      Reminder: "Reminder",
      Private: "Private"
      

  });
  $translateProvider.translations("es", {
    Login: "Ingresar",
    Username: "Usuario",
    Password: "Contraseña",
    Company: "Compañia",
    Menu: "Menu",
    Contacts:   "Contactos",
    Scheduler: "Calendario",
    Webmail: "Webmail",
    Logout: "Salir", 
    Detail: "Detalle",
      Address: "Direccion",
      Street: "Calle",
      Zip: "Zip",
      City: "Ciudad",
      Communication: "Comunicacion",
      Info: "Info",
      Search: "Buscar",
      Previous: "Anterior",
      Today: "Hoy",
      Next: "Siguiente",
      Month: "Mes",
      Week: "Semana",
      Day: "Dia",
      AppointmentDetail: "Detalle de Evento",
      Title: "Titulo",
      Type: "Tipo",
      Priority: "Prioridad",
      StartDate: "Fecha de inicio",
    Thisisanalldayappointment: " Evento de todo el día ", 
      EndDate: "Fecha de finalización",
      Recurrent: "Recurrente",
      Location: "Localización",
      Reminder: "Recordatorio",
      Private: "Privado"
  });



  $translateProvider.translations("de", {
    Login: "Anmeldung",
    Username: "Benutzername",
    Password: "Kennwort",
    Company: "Firma",
    Menu: "Menü",
    Contacts:   "Kontakte",
    Scheduler: "Termine",
    Webmail: "Webmail",
    Logout: "Abmelden", 
      Detail: "Allgemein",
      Address: "Anschrift",
      Street: "Straße",
      Zip: "PLZ",
      City: "Ort",
      Communication: "Kommunikation",
      Info: "Info",
      Search: "Suche",
      Previous: "früher",
      Today: "heute",
      Next: "nächster",
      Month: "Monat",
      Week: "Woche",
      Day: "Tag",
      AppointmentDetail: "Termin Allgemein",
      Title: "Termin",
      Type: "Terminart",
      Priority: "Priorität",
     StartDate: "Beginn",
    Thisisanalldayappointment: "ganztägig", 
      EndDate: "Ende",
      Recurrent: "Wiederkehrender Termin",
      Location: "Ort",
      Reminder: "Erinnerung ",
      Private: "Privat"
  });



  $translateProvider.translations("fr", {
    Login: "Connexion",
    Username: "Utilisateur",
    Password: "Mot de passe",
    Company: "Société",
    Menu: "Menu",
    Contacts:   "Contacts",
    Scheduler: "Scheduler",
    Webmail: "Webmail",
    Logout: " Sortir",
      Detail: "Détail",
      Address: "Adresse",
      Street: "Rue",
      Zip: "Zip",
      City: "Ville",
      Communication: "Communication",
      Info: "Infos",
      Search: "Rechercher",
      Previous: "précédent",
      Today: "aujourd'hui",
      Next: "suivant",
      Month: "Mois",
      Week: "Semaine",
      Day: "Jour",
      AppointmentDetail: "Événement Détail",
      Title: "Titre",
      Type: "Tipy",
      Priority: "Priorité",
      StartDate: "Date de début",
    Thisisanalldayappointment: "Événement de toute la journée", 
      EndDate: "Fin de date",
      Recurrent: "Récurrent(e)",
      Location: "Localisation",
      Reminder: "Rappel",
      Private: "Privé"
      
      
  });

  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
});
