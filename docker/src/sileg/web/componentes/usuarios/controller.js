
app.controller("UsuariosCtrl", ["$scope", "$resource", "$routeParams", function ($scope, $resource, $routeParams) {

  // definición del recurso usuario
  var Usuario = $resource(
                  url='http://127.0.0.1:5001/sileg/api/v1.0/usuarios/:usuario?limit=10', {},
                  {
                    'get': {method:'GET', params:{usuario:'@usuario'}, isArray: true}
                  }
                );


  $scope.usuarios = [];

  $scope.uid = $routeParams.usuario;
  if ($scope.uid != null) {
    $scope.usuarios = Usuario.get({usuario:$scope.uid});
  };

}]);
