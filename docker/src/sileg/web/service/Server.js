//Acceso al servidor
//El acceso al servidor se mantiene en un servicio independiente por la razon de que si se desea cambiar el modo de acceso al servidor, sera mas facil manipularlo
//Los metodos de ServerAccess retornar una promesa cuya respuesta poseera los siguientes valores principales:
//data: "something" Datos devueltos
//status: 200 Codigo de estado
//statusText: "OK" Texto de estado

app.service("Server", Server);

Server.$inject = ["$http"];

function Server($http){
  this.http = $http;
}




//Metodo de consulta de designacion
//@param {String} entity Entidad
//@param {String} search Busqueda simple
//@param {Array<Object>} filter Filtro de busqueda avanzada 
//  [{field:field, value:value, [option:option], [mode:mode]}, ...]
//@param {Array<Object>} params Parametros de busqueda avanzada (igualdad)
//  {field1:value, field2:[value1, value2], ...}
//@param {Array} order Ordenamiento
//  [{field:option}, {id:"asc"|true}, {something:"desc"|false}, ...]
//@example DataDefinition.id({entity:"persona", params:{nombre:"Juan"}});
Server.prototype.designaciones = function(p){ 
   return this.http.post("http://127.0.0.1:5001/sileg/api/v1.0/designaciones/", {data:JSON.stringify(p)}).then(
     function(response){
       return response.data;
     }   
   ); 
};

/*
Server.prototype.designaciones = function(p){
    $http({
      url: "http://127.0.0.1:5001/sileg/api/v1.0/designaciones",
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(p)
    }).success(function(data) {
      console.log(data)
    });
 }
*/
