
app.controller("DesignacionNoDocenteCtrl", ["$scope", "$resource", "$state", '$http', '$timeout', '$q', function ($scope, $resource, $state, $http, $timeout, $q) {

  $state.go('designacion_no_docente.nueva');

  $scope.model = {
    buscando: false,
    buscar: null,
    usuario: null,
    usuarios : []
  }

  $scope.view = {
    texto: ''
  }

  $scope.textoCambiado = function() {
  }

  /*
    inicia el timer para buscar la persona
  */
  $scope.buscarPersonas = function() {
    if ($scope.model.buscando) {
      return;
    }
    if ($scope.model.buscar) {
      console.log('cancelando');
      $timeout.cancel($scope.model.buscar);
    }
    var def = $q.defer();
    $scope.model.buscar = $timeout($scope.buscarPersona(def), 1000);
    return def.promise;
  }

  /*
    busca las personas
  */
  $scope.buscarPersona = function(def) {
    return function() {
      $scope.model.buscando = true;
      $scope.model.buscar = null;
      $scope.model.usuarios = [];
      console.log($scope.view.texto);
      var api = $scope.model.api;
      var coded = window.encodeURIComponent($scope.view.texto);
      $http.get(api + '/usuarios/?q=' + coded).then(
        function(d) {
          console.log(d.data);
          $scope.model.usuarios = d.data;
          $scope.model.buscando = false;
          def.resolve(d.data);
        },
        function(err) {
          console.log(err);
          $scope.model.buscando = false;
          def.resolve([]);
        }
      );
    }
  }

  $scope.$parent.obtener_config().then(
    function(c) {
      $scope.model.api = c.data.sileg_api_url;
    },
    function(err) {
      console.log(err);
    });

}]);
