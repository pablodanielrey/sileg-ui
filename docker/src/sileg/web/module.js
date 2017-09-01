app = angular.module('MainApp', ['ngRoute', 'ngResource'])

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/designaciones', {templateUrl: '/componentes/designaciones/index.html', controller:'DesignacionesCtrl'})
    .when('/preload', {templateUrl: '/componentes/preload/index.html', controller:'PreloadCtrl'})
    .otherwise({ redirectTo: '/preload' });

}]);

app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
