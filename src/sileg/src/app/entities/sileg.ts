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
