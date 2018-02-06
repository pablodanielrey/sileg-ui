app.controller("BuscarCtrl", ["$scope", "$resource", "$location", "$timeout", "$q", function ($scope, $resource, $location, $timeout, $q) {

  var self = this;
  $scope.uri = "http://usuarios.econo.unlp.edu.ar:5006/users/api/v1.0/usuarios/?dni=";


  $scope.items = ['asdas', 'sgsdghsd']
  self.repos         = loadAll();
  self.simulateQuery = true;

  $scope.buscar = function(textoBuscar) {


    var results = textoBuscar ? self.repos.filter( createFilterFor(textoBuscar) ) : self.repos,
        deferred;
    return results;
  }


  function loadAll() {
    var repos = [
      {
        'nombre'      : 'Nombre',
        'apellido'       : 'Testing',
        'dni'  : '3021578'
      },
      {
        'nombre'      : 'Emanuel',
        'apellido'       : 'Pais',
        'dni'  : '31381082'
      }    ];
    return repos.map( function (repo) {
      repo.value = repo.nombre.toLowerCase();
      return repo;
    });
  }


  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return (item.value.indexOf(lowercaseQuery) === 0);
    };

  }


}]);
