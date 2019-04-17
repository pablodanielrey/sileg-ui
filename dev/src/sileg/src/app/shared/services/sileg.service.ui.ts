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
              usuario_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4'
            },
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: '', dni: ''  },
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
    let personas = [
      {
        id: '23423',
        nombre: 'Walter',
        apellido: 'Blanco',
        dni: '30001823'
      },
      {
        id: '23424',
        nombre: 'Alejandro Agustin',
        apellido: 'Oporto',
        dni: '29587695'
      },
      {
        id: '23425',
        nombre: 'Emanuel Joaquin',
        apellido: 'Pais',
        dni: '33548456'
      },
      {
        id: '23426',
        nombre: 'Pablo Daniel',
        apellido: 'Rey',
        dni: '27635984'
      },
      {
        id: '23427',
        nombre: 'Miguel',
        apellido: 'Macagno',
        dni: '35626943'
      },
      {
        id: '23428',
        nombre: 'Leonardo',
        apellido: 'Consolini',
        dni: '35666215'
      },
      {
        id: '23429',
        nombre: 'Ivan Cesar',
        apellido: 'Castañeda',
        dni: '312569525'
      },
      {
        id: '23430',
        nombre: 'Maximiliano',
        apellido: 'Sauceso',
        dni: '28569885'
      }
    ];
    let personas2 = personas.filter( v => 
        v.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        v.apellido.toLowerCase().includes(texto.toLowerCase()) ||
        v.dni.toLowerCase().includes(texto.toLocaleLowerCase())
      );
    return of(personas2);
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
    let lugares = [
      {
        id: '1',
        nombre: 'Microeconomía I',
        superior:'Departamento de Economía',
        abreviatura:'M'
      },
      {
        id: '2',
        nombre: 'Microeconomía II',
        superior:'Departamento de Economía',
        abreviatura:'M'
      },
      {
        id: '3',
        nombre: 'Derecho Constitucional y Administrativo',
        superior:'Departamento de Contabilidad',
        abreviatura:'D'
      },
      {
        id: '4',
        nombre: 'Matemática para Economistas I',
        superior:'Departamento de Economía',
        abreviatura:'M'
      },
      {
        id: '5',
        nombre: 'Estadística para Economistas I',
        superior:'Departamento de Ciencias Administrativas',
        abreviatura:'E'
      },
      {
        id: '6',
        nombre: 'Estadística para Economistas II',
        superior:'Departamento de Economía',
        abreviatura:'E'
      },
      {
        id: '7',
        nombre: 'Economía Internacional',
        superior:'Departamento de Contabilidad',
        abreviatura:'E'
      },
      {
        id: '8',
        nombre: 'Finanzas Internacionales',
        superior:'Departamento de Ciencias Administrativas',
        abreviatura:'F'
      },
      {
        id: '9',
        nombre: 'Economía y Regulación de los Servicios Públicos',
        superior:'Departamento de Economía',
        abreviatura:'E'
      },
      {
        id: '10',
        nombre: 'Política Económica II',
        superior:'Departamento de Ciencias Administrativas',
        abreviatura:'P'
      }
    ];
    lugares = lugares.filter( v => v.nombre.toLowerCase().includes(texto.toLowerCase()));
    return of(lugares).delay(1500);
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
