
function AdministracionDesignacionCtrl($scope, $location, Server){

  $scope.setMainTitle("Administración de Designación");
  
  $scope.disabled = true;  
  $scope.message = "Iniciando"; //mensaje
  $scope.id = null;
  
  $scope.options = {}; //opciones
  
  scope.designacion = {};
    

 
 
  //Reemplazar por la lectura de parametros a traves del ruteo
  $scope.initParams = function(){
    var urlParams = $location.search();
    for(var param in urlParams) $scope.params[param] = urlParams[param];
    if("id" in urlParams) $scope.id = urlParams["id"];
  };
  
  
  $scope.$on('$viewContentLoaded', function(event) { 
    $scope.setOptions().then(
      function(response){
        $scope.setData().then(
          function(response){
            $scope.formatDesignacion(response);
            $scope.disabled = false;
            $scope.message = null
          }
        )
      }   
    );  
  });
  
  $scope.setOptions = function(){
    Server.cargos().then(
      function(response){ $scope.options["cargos"] = response; },
      function(error){ console.log(error); }
    );
  };
  
  $scope.setData = function(){
    if($scope.id) return Server.designaciones({"id":$scope.id});
    else return Server.q.when({});     
  };
  
  
  //Cada componente formatea los datos para su propio uso
  $scope.formatDesignacion = function(designacion){
    designacion.desde = (designacion.desde) ? new Date(designacion.desde) : new Date(),
    designacion.hasta = (designacion.hasta) ? new Date(designacion.hasta) : new Date(),
  };
  


  
 $scope.setData = function(){
    var promises = [];
    var pr = DataDefinition.initializeFieldset({entity:"asignatura", params:$scope.params}).then(
      function(response){ $scope.asignatura = response.row; }
    );
    promises.push(pr);
    
    return DataDefinition.q.all(promises); 
  };



  
  

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


app.controller("AdministracionDesignacionCtrl", AdministracionDesignacionCtrl);

