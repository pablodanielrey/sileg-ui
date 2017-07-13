
//Controlador Indice
app.controller("IndexCtrl", ["$scope", "$timeout", "$uibModal", "$window", function ($scope, $timeout, $uibModal, $window) {
  
  //***** almacenamiento de variables globales del scope *****
  $scope.global = {};
  $scope.set = function(name, value){ $scope.global[name] = value; };
  $scope.get = function(name){ return $scope.global[name]; };
  
  
  //***** definir titulo principal *****
  $scope.setMainTitle = function(mainTitle){ $scope.mainTitle = mainTitle; };
  
  
  //***** almacenar alerts a traves de modal *****
  $scope.alerts = []; //array de almacenamiento de alerts
   
   
  //***** disparar alert modal *****
  //@param newAlert = {title: "Titulo del alert", message:"Mensaje del alert", type:"tipo del mensaje"}
  //  type = "string" (defecto) | "array"
  //  message: If (type = "string") message = "String" else if(type = "array") message = Array
  $scope.alert = function(newAlert) {
    if (newAlert.type == undefined) newAlert.type = "string";
    if(newAlert.type == "string"){
      var templateUrl = "main/html/modalAlert.html";
      var size = "sm";
    } else {
      var templateUrl = "main/html/modalAlertArray.html";
      var size = "lg";
    }
    
    for(var i = 0; i < $scope.alerts.length; i++){
      if(newAlert.message == $scope.alerts[i].message) return;
    }

    $scope.alerts.push(newAlert);
    
    var modalInstance = $uibModal.open({
      animation: true, templateUrl: templateUrl, controller: "ModalAlertCtrl", size: size,
      resolve: {
        newAlert: function () {
          return newAlert; //se retorna el mismo mensaje para poder ser eliminado de la lista de mensajes
        }
      }
    });
    
    //se puede redefinir para dar soporte a confirm
    modalInstance.result.then(
      function () { //ok
        var index = $scope.alerts.indexOf(newAlert);
        if(index > -1) $scope.alerts.splice(index, 1);        
      },
      function(){ //cancel y clic afuera
        var index = $scope.alerts.indexOf(newAlert);
        if(index > -1) $scope.alerts.splice(index, 1);        
      }
    );
    
    $timeout(function() { modalInstance.close(); },5000); //cerrar alert transcurridos los 5 segundos
  };
  
  

  
  //***** numero entero aleatorio utilizado para evitar el almacenamiento de cache en los ng-include *****
  $scope.nocache = Math.floor((Math.random() * 100000) + 1);
 

     
}]);


