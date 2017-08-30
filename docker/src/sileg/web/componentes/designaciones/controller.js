
app.controller("DesignacionesCtrl", ["$scope", "$resource", "$location", function ($scope, $resource, $location) {

  //
  // var Designacion = $resource('http://127.0.0.1:5001/sileg/api/v1.0/designaciones/');
  // $scope.designaciones = Designacion.query();
  //
  // Designacion.get(id)
  //
  // $scope.viewUser = function(uid) {
  //   $location.path('/usuarios/' + uid);
  // };

  $scope.model = {
    dedicacion: {
      cargo: '',
      tipo_cargo: '',
      caracter_cargo: '',
      dedicacion_cargo: '',

    },

    usuario: {
      dni: '',
      nombre: '',
      apellido: ''
    }

    cargos: [ {id:'', nombre:''} ],
    dedicaciones_cargos: [''],
    caracter_cargos: [],
    tipo_cargos: [],

  }


}]);
