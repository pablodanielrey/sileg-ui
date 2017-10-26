
app.controller("DesignacionNoDocenteCtrl", ["$scope", "$resource", "$state", function ($scope, $resource, $state) {


  $state.go('designacion_no_docente.nueva');


  $scope.model = {
    usuario: {
      dni: '',
      nombre: '',
      apellido: ''
    }
  }

  


}]);
