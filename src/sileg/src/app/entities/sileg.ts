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

export class Designacion {
  designacion_id: string;
  usuario_id: string;
  cargo_id: string;
  lugar_id: string;
  historico: boolean;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}
