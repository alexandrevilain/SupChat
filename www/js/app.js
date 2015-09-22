angular.module('app', ['ionic', 'app.controllers', 'firebase', 'ngIOS9UIWebViewPatch'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('connexion', {
        cache: true,
        url: '/connexion',
        templateUrl: 'views/connexion.html',
        controller: 'ConnexionCtrl'
      })
    .state('chat', {
      cache: true,
      url: '/chat/:conversation/:user',
      templateUrl: 'views/chat.html',
      controller: 'ChatCtrl'
    });
    $urlRouterProvider.otherwise('/connexion');

  });
