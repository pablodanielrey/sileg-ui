import { Clave } from '../entities/clave';
import { Mail } from '../entities/mail';

export class Usuario {

  id: string = null;
  creado: Date = null;
  actualizado: Date = null;

  nombre: string = null;
  apellido: string;
  dni: string;
  claves: Array<Clave>;
  mails: Array<Mail>
}
