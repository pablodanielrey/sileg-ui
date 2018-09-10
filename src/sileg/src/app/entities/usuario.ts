export class Clave {
}

export class ResetClave {
  uid: string = null;
  clave: string = null;


  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}

export class Mail {
  id: string;
  usuario_id: string;
  email: string;
  eliminado: boolean;
  confirmado: string;
  actualizado: string;
  creado: string;
}

export class Telefono {
  id: string;
  usuario_id: string;
  numero: string;
  tipo: string;
  actualizado: string;
  creado: string;
  eliminado: string;
}

export class Usuario {

  id: string = null;
  creado: Date = null;
  actualizado: Date = null;

  nombre: string = null;
  apellido: string = null;
  dni: string = null;
  genero: string = null;
  legajo: string = null;
  claves: Array<Clave>;
  mails: Array<Mail>;
  telefonos: Array<Telefono>;
  pais: string= null;
  ciudad: string= null;
  direccion: string= null;

  constructor(o:Object) {
    console.log("const usuarios");
    try {
      Object.assign(this, o);
      this.creado = (this.creado == null ? null : new Date(this.creado));
      this.actualizado = (this.actualizado == null ? null : new Date(this.actualizado));
    } catch(e) {
      console.log(e);
    }
  }
}
