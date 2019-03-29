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
            designacion: {
              id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              expediente: 'dsfsdf',
              resolucion: '23r32r',
              corresponde: 'sdf',
              cargo_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              cargo: { 
                nombre: 'Titular',
                id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
              },
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
              usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  }
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

  obtenerDesignacion(id: string): Observable<any> {
    let d = {
      id: id,
      expediente: 'dsfsdf',
      resolucion: '23r32r',
      corresponde: 'sdf',
      cargo: { 
        nombre: 'Titular',
        id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
      }
    }      
    return of(d);
  }
  
  obtenerPersona(uid: string): Observable<any> {
    return of({
      id: '23423',
      nombre: 'prueba de persona',
      apellido: 'prueba de apellido',
      dni: '23456'
    });
  }

  buscarPersonas(texto: string): Observable<any[]> {
    return of([
        {
          id: '23423',
          nombre: 'prueba de persona',
          apellido: 'prueba de apellido',
          dni: '23456'
        },
        {
          id: '23423',
          nombre: 'prueba de persona',
          apellido: 'prueba de apellido',
          dni: '23456'
        }
      ]
    );
  }  

  obtenerLugar(lid: string): Observable<any> {
    return of(
      {
        id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
        nombre: 'DiTeSI'
      }
    );
  }

  buscarLugares(texto: string): Observable<any[]> {
    return of([
        {
          id: Math.random().toString(),
          nombre: Math.random().toString()
        },
        {
          id: '2',
          nombre: 'facultad'
        },
        {
          id: '3',
          nombre: 'algo mas'
        },
        {
          id: '4',
          nombre: 'Secretaria'
        }
      ]
    );
  }  


  obtenerPuntosPersona(uid: string): Observable<number> {
    return of(34);
  }

  obtenerCargosDisponibles(): Observable<any[]> {
    return of([
      { nombre:'Titular', caracter:'internino', dedicacion: 'exclusiva', id:'1', puntos: 10 },
      { nombre:'Titular', caracter:'ad-hon', dedicacion: 'semi-exclusiva', id:'2', puntos: 20 },
      { nombre:'Titular', caracter:'ad-honorem', dedicacion: 'no', id:'3', puntos: 30 },
      { nombre:'Adjunto', caracter:'ad-honorem', dedicacion: 'exclusiva', id:'4', puntos: 40 },
      { nombre:'Adjunto', caracter:'interino', dedicacion: 'simple', id:'5', puntos: 14 }
    ]);
  }  
}
