(function() {
    'use strict'
    angular
      .module('app')
      .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['$scope', '$http'];

    function IndexCtrl($scope, $http) {
        $scope.obtenerDesignaciones = function() {
          // obtener la url del sitio actual.
          $http.get('/sileg/api/v1.0/designaciones').then(
              function(ds) {
                alert(ds);
              },
              function(err) {
                alert(err);
              }
          );
        }
        //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
    };

})();
