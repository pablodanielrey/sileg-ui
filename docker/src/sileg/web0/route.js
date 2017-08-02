
app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/home', { templateUrl: '/component/home/index.html'})
  .when('/grillaDesignaciones', { templateUrl: '/component/grillaDesignaciones/index.html', controller:"GrillaDesignacionesCtrl"})  

    .otherwise({ redirectTo: '/home' });
}]);
