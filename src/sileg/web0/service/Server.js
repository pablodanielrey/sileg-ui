
//Servicio de definicion de datos

app.service("Server", Server);

Server.$inject = ["$q", "$http"];


function Server($q, $http){
  this.q = $q;
  this.http = $http;
};




//Consulta de designaciones con datos asociados, admite filtros de busqueda
//@param FILTROS DE BUSQUEDA
//  page Pagina
//  size Tamanio
Server.prototype.designaciones = function(p){ 
   return this.http.post("http://127.0.0.1:5001/sileg/api/v1.0/designaciones/", {data:JSON.stringify(p)}).then(
     function(response){ return response.data; },
     function(error){ console.log(error) }
   ); 

};



