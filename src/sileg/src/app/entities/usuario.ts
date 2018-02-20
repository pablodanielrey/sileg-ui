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

export class Usuario {

  id: string = null;
  creado: Date = null;
  actualizado: Date = null;

  nombre: string = null;
  apellido: string;
  dni: string;
  claves: Array<Clave>;
  mails: Array<Mail>;


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
