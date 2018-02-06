
function GrillaDesignacionesCtrl($scope, $location, Server){

  $scope.disabled = true;  
  $scope.config = {page:1, size:10, params:{"tipo":"original"}, order:{"desde":true}};

  $scope.designaciones = [];
    
  $scope.setMainTitle("Grilla de Designaciones");
 
 
  //Se accede al servicio Server para obtener los datos json del servidor
  $scope.$on('$viewContentLoaded', function(event) {
    Server.designaciones($scope.config).then(
      function(response){
        $scope.designaciones = [];
        for(var i = 0; i < response.length; i++) $scope.formatDesignacion(response[i]); 
        $scope.disabled = false;
      }
    );
  });
  
  
  
  //Cada componente formatea los datos para su propio uso
  $scope.formatDesignacion = function(designacion){
    designacion.desde = (designacion.desde) ? new Date(designacion.desde) : null,
    designacion.hasta = (designacion.hasta) ? new Date(designacion.hasta) : null,
    $scope.designaciones.push(designacion);   
  }
  


}


app.controller("GrillaDesignacionesCtrl", GrillaDesignacionesCtrl);

