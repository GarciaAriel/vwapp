// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pascalprecht.translate', 'starter.controllers','starter.services'])

.run(function($ionicPlatform, $translate) {
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
            Company: "Company"
        });
    $translateProvider.translations("es", {
            Login: "Ingresar",
            Username: "Usuario",
            Password: "Contraseña",
            Company: "Compania"
        });
    
     $translateProvider.translations("de", {
            Login: "Anmeldung",
            Username: "Benutzername",
            Password: "Kennwort",
            Company: "Firma"
        });
    
    
     $translateProvider.translations("fr", {
            Login: "Connexion",
            Username: "Utilisateur",
            Password: "Mot de passe",
            Company: "Société"
        });
    
    $translateProvider.preferredLanguage("de");
    $translateProvider.fallbackLanguage("en");
})







.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('app', {
    url: "/app",
    //abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.webmail', {
    url: "/webmail",
    views: {
      'menuContent': {
        templateUrl: "templates/views_webmail/webmail.html"
      }
    }
  })

    .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/views_contact/contact.html"
      }
    }
  })

  .state('app.scheduler', {
    url: "/scheduler",
    views: {
      'menuContent': {
        templateUrl: "templates/views_schedule/scheduler.html"
      }
    }
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
  
  
  
  
  .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/sub-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

  
     .state('app.contact-detail', {
      url: '/contact/:contactId',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact-detail.html',
          controller: 'ContactDetailCtrl'
        }
      }
    })
  
  
  

  
  
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
