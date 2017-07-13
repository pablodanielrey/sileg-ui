
//Servicio de definicion de datos

app.service("DataDefinition", DataDefinition);

DataDefinition.$inject = ["$q", "$window", "Server"];

function DataDefinition($q, $window, Server){
  this.Server = Server;
  this.window = $window;
  this.q = $q;
};


//Consulta basica de entidades, admite filtros de busqueda
//@param entity Descripcion de la entidad que se desea consultar
//@param FILTROS DE BUSQUEDA
//  page Paginacion
DataDefinition.prototype.query = function(p){

}


//Consulta de designaciones con datos asociados, admite filtros de busqueda
//@param FILTROS DE BUSQUEDA
//  page Paginacion
DataDefinition.prototype.designaciones = function(p){ 
  return this.Server.designaciones(p).then( 
    function(response){ 
      console.log(response);
    }
    
  );

};


