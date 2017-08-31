
app.controller("PreloadCtrl", ["$scope", "$http", '$location', function ($scope, $http, $location) {

  $scope.$parent.estado = 'EstadoPreload';

  $scope._inicializar = function() {
  }

  $scope.$on('config', $scope._inicializar);

  $scope._inicializar();

}]);
