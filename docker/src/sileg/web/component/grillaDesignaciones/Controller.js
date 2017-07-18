
function GrillaDesignacionesCtrl($scope, $location, DataDefinition){

  $scope.disabled = true;  
  $scope.config = {page:1, size:10};

  
  $scope.designaciones = [];
    
   
  $scope.setMainTitle("Grilla de Designaciones");
 
  $scope.$on('$viewContentLoaded', function(event) {  
    DataDefinition.designaciones($scope.config).then(
      function(response){
        $scope.designaciones = [];
        for(var i = 0; i < response.length; i++) $scope.setDesignacion(response[i]); 
        $scope.disabled = false;
      }
    );
  });
  
  
  $scope.setDesignacion = function(designacion){
    designacion.desde = (designacion.desde) ? new Date(designacion.desde) : null,
    designacion.hasta = (designacion.hasta) ? new Date(designacion.hasta) : null,
    $scope.designaciones.push(designacion);   
  }
  


}


app.controller("GrillaDesignacionesCtrl", GrillaDesignacionesCtrl);

