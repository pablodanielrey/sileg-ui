app = angular.module('MainApp', ['ui.router', 'ngResource', 'ngMaterial'])

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .warnPalette('red')
    .accentPalette('cyan');
});


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/preload");

  // --- preload ----

  $stateProvider
  .state('preload', {
    url:'/preload',
    templateUrl: 'componentes/preload/index.html',
    controller:'PreloadCtrl'
  })
  .state('preload.bienvenido', {
    url:'/bienvenido',
    templateUrl: 'componentes/preload/templates/bienvenido.html',
  })
  .state('preload.error', {
    url:'/error',
    templateUrl: 'componentes/preload/templates/error.html',
  })


  // ---- perfil ----

  $stateProvider
  .state('designacion_no_docente', {
    url:'/designacion_no_docente',
    params: {
      uid: ''
    },
    templateUrl: 'componentes/designacion_no_docente/index.html',
    controller:'DesignacionNoDocenteCtrl'
  })
  .state('designacion_no_docente.cargando', {
    url:'/cargando',
    templateUrl: 'componentes/designacion_no_docente/templates/cargando.html'
  })
  .state('designacion_no_docente.nueva', {
    url:'/nueva',
    templateUrl: 'componentes/designacion_no_docente/templates/nueva.html'
  })

  // ----- buscar ------
  $stateProvider
  .state('buscar', {
    url:'/buscar',
    templateUrl: 'componentes/buscar/index.html',
    controller:'BuscarCtrl'
  })
  /*
    ejemplo de error para ema
  .state('perfil.errorActualizandoUsuario', {
    url:'/error_actualizando_usuario',
    templateUrl: 'componentes/perfil/templates/error_actualizando_usuario.html'
  })

  */

}]);


app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
