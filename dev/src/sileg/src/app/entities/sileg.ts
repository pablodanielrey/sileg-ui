import { Usuario } from '../entities/usuario';

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

export class Lugar {
  id: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  numero: string;
  telefono: string;
  email: string;
  eliminado: Date;


  constructor(o:Object) {
    try {
      Object.assign(this, o);
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

export class Cargo {
  nombre: string;
  id: string;
  tipo: string;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }

}

export class Designacion {
  desde: Date;
  designacion_id: string;
  usuario_id: string;
  cargo_id: string;
  cargo: Cargo;
  lugar_id: string;
  lugar: Lugar;
  historico: boolean;
  id: string;

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
