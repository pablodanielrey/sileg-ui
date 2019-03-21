import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http'


import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { Mail, Usuario, ResetClave } from '../entities/usuario';
import { Sileg, DatosSileg, Lugar, PedidoDesignacion, Designacion, Cargo, DatosLugarDesignaciones, DatoDesignacion, Dato2Designacion, Configuracion } from '../entities/sileg';

const SILEG_API_URL = environment.silegApiUrl;
const LOGIN_API_URL = environment.loginApiUrl;
const USUARIO_API_URL = environment.usuarioApiUrl;

@Injectable()
export class SilegService {
  
  constructor(private http: HttpClient) { }

  desginacionesPendientes(lids): Observable<any[]> {
    let d = [
      {
        lugar: {
          id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
          nombre: 'DiTeSI'
        }, 
        designaciones: [
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          },

          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          },
          
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          }          
        ],
        ptos_alta: 65, 
        ptos_baja: 60
      },

      {
        lugar: {
          id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
          nombre: 'DiTeSI'
        }, 
        designaciones: [
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          }
        ],
        ptos_alta: 65, 
        ptos_baja: 60
      },

      {
        lugar: {
          id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
          nombre: 'DiTeSI'
        }, 
        designaciones: [
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          }
        ],
        ptos_alta: 65, 
        ptos_baja: 60
      },

      {
        lugar: {
          id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
          nombre: 'DiTeSI'
        }, 
        designaciones: [
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            ptos: 10,
            estado: { fecha: new Date(), nombre: 'Alta Pendiente', autorizador_id: 'sdfdsfsdfsdfdsfsdfd' }
          }
        ],
        ptos_alta: 65, 
        ptos_baja: 60
      },


    ]
    return of(d);
  }

}
