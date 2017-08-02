app = angular.module('MainApp', ['ngRoute', 'ngResource'])

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/designaciones', {templateUrl: '/componentes/designaciones/index.html', controller:'DesignacionesCtrl'})
    .otherwise({ redirectTo: '/' });

}]);

app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
