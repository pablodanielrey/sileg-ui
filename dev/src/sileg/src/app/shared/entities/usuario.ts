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

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }   
}

export class Telefono {
  id: string = null;
  usuario_id: string = null;
  numero: string = "";
  tipo: string = null;
  actualizado: string = null;
  creado: string = null;
  eliminado: Date = null;
  nuevo: boolean = false;


  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }  
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
  nacimiento: Date = null;

  constructor(o:Object) {
    console.log("const usuarios");
    try {
      Object.assign(this, o);
      this.creado = (this.creado == null ? null : new Date(this.creado));
      this.actualizado = (this.actualizado == null ? null : new Date(this.actualizado));
      this.nacimiento = (this.nacimiento == null ? null: new Date(this.nacimiento));
      this.telefonos = (this.telefonos == null) ? []: this.telefonos.map(t => new Telefono(t));
    } catch(e) {
      console.log(e);
    }
  }
}
