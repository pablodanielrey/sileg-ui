
function GrillaDesignacionesCtrl($scope, $location, DataDefinition){


  $scope.disabled = true;

  $scope.designaciones = [];
    
   
  $scope.setMainTitle("Grilla de Designaciones");
 
  $scope.$on('$viewContentLoaded', function(event) {
  
    DataDefinition.designaciones({entity:"designacion", search:"something"}).then(
      function(response){
        console.log(response);
        $scope.disabled = false;
      }
    );
  });
  


}


app.controller("GrillaDesignacionesCtrl", GrillaDesignacionesCtrl);

