app = angular.module('MainApp', ['ngRoute', 'ngResource'])

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/designaciones', {templateUrl: '/componentes/designaciones/index.html', controller:'DesignacionesCtrl'})
    .when('/usuarios/:usuario', {templateUrl: '/componentes/usuarios/index.html', controller:'UsuariosCtrl'});
    //.otherwise({ redirectTo: '/' });

}]);

app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
