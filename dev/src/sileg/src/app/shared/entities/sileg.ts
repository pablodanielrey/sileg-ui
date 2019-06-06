import { Usuario } from '../entities/usuario';

// =================================================
// ================== NUEVO ========================
// =================================================

export class Cargo {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  dedicacion: string;
  codigo: string;
  puntos: number;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }

}

export class Caracter {
  id: string;
  nombre: string;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }  
}

export class Estado {
  id: string;
  fecha: Date;
  tipo: string;
  estado: string;
  final: boolean;
  codigo: string;
  estilo: string;
  autorizador_id: string;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  } 
  
}

export class Designacion {
  id: string;
  usuario_id: string;
  usuario: Usuario;
  cargo_id: string;
  cargo: Cargo;
  caracter_id: string;
  caracter: Caracter;
  lugar_id: string;
  lugar: Lugar;
  historico: boolean = false;
  desde: Date;
  expediente: string;
  resolucion: string;
  corresponde: string;
  tipo: string;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      if (this.desde != null && typeof this.desde == "string" ) {
        // "fecha" = 'yyyy-mm-dd'
        // el mes del Date empieza desde 0 (0-11)
        let f = o["desde"].split("-");
        this.desde = new Date(f[0], f[1] - 1, f[2]);
      }
    } catch(e) {
      console.log(e);
    }
  }
}

export class DatosDesignacion {
  usuario: Usuario;
  designacion: Designacion;
  estado: Estado;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }  
}

export class DatosLugarDesignacion {
  designaciones: Array<DatosDesignacion>;
  lugar: Lugar;
  puntos_alta: number;
  puntos_baja: number;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }  
}

export class Lugar {
  id: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  numero: string;
  telefono: string;
  email: string;
  eliminado: Date;
  padre_id: string;
  padre: Lugar;
  abreviatura: string;


  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.abreviatura = (this.nombre && this.nombre.length > 0) ? this.nombre.charAt(0) : '';
    } catch(e) {
      console.log(e);
    }
  }
}

// =================================================
// ============== FIN NUEVO ========================
// =================================================
export class Sileg {
  actualizado: string;
  creado: string;
  id: string;
}

export class DatosSileg {
  agregado: boolean;
  sileg: Sileg;
  usuario: Usuario;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.usuario = (this.usuario == null) ? null : new Usuario(this.usuario);
    } catch(e) {
      console.log(e);
    }
  }
}

export class DatosLugarDesignaciones {
  lugar: Lugar;
  designaciones: Array<DatoDesignacion>;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.lugar = (this.lugar == null ? null : new Lugar(this.lugar));
      this.designaciones = (this.designaciones == null) ? [] : this.designaciones.map(d => new DatoDesignacion(d));
    } catch(e) {
      console.log(e);
    }
  }
}

export class DatoDesignacion {
  designacion: Designacion;
  usuario: Usuario;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.designacion = (this.designacion == null ? null : new Designacion(this.designacion));
    } catch(e) {
      console.log(e);
    }
  }
}

export class Dato2Designacion {
  lugar: Lugar;
  cargo: Cargo;
  designacion: Designacion;
  usuario: Usuario;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.designacion = (this.designacion == null ? null : new Designacion(this.designacion));
    } catch(e) {
      console.log(e);
    }
  }
}


export class PedidoDesignacion {
  lugar_id: string;
  usuario_id: string;
  correo: string;
}

// export class Cargo {
//   nombre: string;
//   id: string;
//   tipo: string;

//   constructor(o:Object) {
//     try {
//       Object.assign(this, o);
//     } catch(e) {
//       console.log(e);
//     }
//   }

// }

// export class Designacion {
//   desde: Date;
//   designacion_id: string;
//   usuario_id: string;
//   cargo_id: string;
//   cargo: Cargo;
//   lugar_id: string;
//   lugar: Lugar;
//   historico: boolean;
//   id: string;

//   constructor(o:Object) {
//     try {
//       Object.assign(this, o);
//       if (this.desde != null && typeof this.desde == "string" ) {
//         // "fecha" = 'yyyy-mm-dd'
//         // el mes del Date empieza desde 0 (0-11)
//         let f = o["desde"].split("-");
//         this.desde = new Date(f[0], f[1] - 1, f[2]);
//       }
//     } catch(e) {
//       console.log(e);
//     }
//   }
// }

export class Configuracion {

  mostrar_organigrama: boolean;
  mostrar_sincronizacion_usuarios: boolean;
  mostrar_sincronizacion_login: boolean;
    
  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}
