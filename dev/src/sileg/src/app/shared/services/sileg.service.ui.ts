import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http'


import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { Mail, Usuario, ResetClave } from '../entities/usuario';
import { Sileg, DatosSileg, Lugar, PedidoDesignacion, Designacion, Cargo, DatosLugarDesignaciones, DatoDesignacion, Dato2Designacion, Configuracion, Caracter } from '../entities/sileg';

const SILEG_API_URL = environment.silegApiUrl;
const LOGIN_API_URL = environment.loginApiUrl;
const USUARIO_API_URL = environment.usuarioApiUrl;

@Injectable()
export class SilegService {

  tipos_cargos:Array<Cargo> = [];
  tipos_caracter: Array<Caracter> = [];
  
  constructor(private http: HttpClient) {
    this.setear_cargos();
    this.setear_caracter();
   }

  setear_caracter(): void {
    this.tipos_caracter = [
      new Caracter({
        'id': 'bffb3c1f-8d91-4a09-941f-b8eeb5e24f40',
        'nombre': 'Interino'
      }),
      new Caracter({
        'id': '8a3c23b9-06cd-4057-ba27-df2d432441b4',
        'nombre': 'Ordinario'
      }),
      new Caracter({
        'id': 'e06be138-8e98-4d9e-a770-912323449ebf',
        'nombre': 'Suplente'
      }),
      new Caracter({
        'id': '61262a1c-429b-41c8-a58e-b15804b5a937',
        'nombre': 'Ad-Honorem'
      })
    ]
  }

  setear_cargos(): void {
    this.tipos_cargos = [
      new Cargo({
        'id': 'b3901ac4-7fc8-43b5-85d7-34da6728bc21',
        'nombre': 'Titular D.E.',
        'descripcion': 'Profesor Titular Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '05E',
        'puntos': 100
      }),
      new Cargo({
        'id': 'eeceeac9-12c1-479f-a8eb-a88aa19d286c',
        'nombre': 'Asociado D.E.',
        'descripcion': 'Profesor Asociado Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '06E',
        'puntos': 89.37
      }),
      new Cargo({
        'id': '',
        'nombre': 'Adjunto D.E.',
        'descripcion': 'Profesor Adjunto Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '07E',
        'puntos': 78.74
      }),
      new Cargo({
        'id': '4680eeea-e534-4515-91d0-e7b456397b68',
        'nombre': 'JTP D.E.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '08E',
        'puntos': 68.10
      }),
      new Cargo({
        'id': 'b4c0d4b6-923f-4f55-8b0a-053e5864e525',
        'nombre': 'Ayudante 1º D.E.',
        'descripcion': 'Ayudante Diplomado Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '09E',
        'puntos': 57.47
      }),
      new Cargo({
        'id': '015d50a9-b3db-4119-b20d-a931ee377e8b',
        'nombre': 'Titular S.E.',
        'descripcion': 'Profesor Titular Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '05S',
        'puntos': 50
      }),
      new Cargo({
        'id': '6341dd1e-d57e-4378-a9fa-c7a6cc66f336',
        'nombre': 'Asociado S.E.',
        'descripcion': 'Profesor Asociado Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '06S',
        'puntos': 44.68
      }),
      new Cargo({
        'id': 'd1a0e4a7-03ca-40a9-a98c-d89cdc322d9a',
        'nombre': 'Adjunto S.E.',
        'descripcion': 'Profesor Adjunto Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '07S',
        'puntos': 39.37
      }),
      new Cargo({
        'id': '5fa3f450-f379-41b8-9b34-26b5e14edc3f',
        'nombre': 'JTP S.E.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '08S',
        'puntos': 34.05
      }),
      new Cargo({
        'id': '37df5825-6640-4568-965e-4478b49e9868',
        'nombre': 'Ayudante 1º S.E.',
        'descripcion': 'Ayudante Diplomado Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '09S',
        'puntos': 28.74
      }),
      new Cargo({
        'id': 'ca0c7105-ade2-4fab-b14c-086248b7a447',
        'nombre': 'Titular D.S.',
        'descripcion': 'Profesor Titular Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '05X',
        'puntos': 25
      }),
      new Cargo({
        'id': 'b65f8e8b-80ee-4ff8-9bf2-f04ba2bdd397',
        'nombre': 'Asociado D.S.',
        'descripcion': 'Profesor Asociado Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '06X',
        'puntos': 22.34
      }),
      new Cargo({
        'id': 'b65f8e8b-80ee-4ff8-9bf2-f04ba2bdd397',
        'nombre': 'Adjunto D.S.',
        'descripcion': 'Profesor Adjunto Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '07X',
        'puntos': 19.68
      }),
      new Cargo({
        'id': '718e8e33-2989-4337-8d79-2609268d315e',
        'nombre': 'JTP D.S.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '08X',
        'puntos': 17.03
      }),
      new Cargo({
        'id': 'dbf391cd-1212-4e40-a795-f466b0c2406d',
        'nombre': 'Ayudante 1º D.S.',
        'descripcion': 'Ayudante Diplomado Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '09X',
        'puntos': 14.37
      }),
      new Cargo({
        'id': '750780c1-496a-4ca9-bcb7-9b3835f205c1',
        'nombre': 'Ayudante 2º D.S.',
        'descripcion': 'Ayudante Alumno Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '10X',
        'puntos': 11.49
      }),
      new Cargo({
        'id': 'aad',
        'nombre': 'Decano D.E.',
        'descripcion': 'Decano Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '02E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'bdffas',
        'nombre': 'Decano T.C.',
        'descripcion': 'Decano Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '02C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zxvaas',
        'nombre': 'Decano T.P.',
        'descripcion': 'Decano Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '02P',
        'puntos': 0
      }),
      new Cargo({
        'id': 'asfgewt',
        'nombre': 'Decano D.S.',
        'descripcion': 'Decano Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '02J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'agwhrey',
        'nombre': 'Vice-Decano D.E.',
        'descripcion': 'Vice-Decano Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '02S',
        'puntos': 0
      }),
      new Cargo({
        'id': 'jkjkllsdgj',
        'nombre': 'Vice-Decano ',
        'descripcion': 'Vice-Decano Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '02K',
        'puntos': 0
      }),
      new Cargo({
        'id': 'psitsetds',
        'nombre': 'Vice-Decano T.P.',
        'descripcion': 'Vice-Decano Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '02X',
        'puntos': 0
      }),
      new Cargo({
        'id': 'iashah',
        'nombre': 'Vice-Decano D.S.',
        'descripcion': 'Vice-Decano Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '02I',
        'puntos': 0
      }),
      new Cargo({
        'id': 'dgagadsgh',
        'nombre': 'Secretario D.E.',
        'descripcion': 'Secretario Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '04E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'nklasdgk',
        'nombre': 'Secreatario T.C.',
        'descripcion': 'Secretario Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '04C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'sdvjoseg',
        'nombre': 'Secreatario T.P.',
        'descripcion': 'Secretario Facultad Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '04P',
        'puntos': 0
      }),
      new Cargo({
        'id': 'asfafgqwqf',
        'nombre': 'Secreatario D.S.',
        'descripcion': 'Secretario Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '04J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'fqptqwtwse',
        'nombre': 'Prosecretario D.E.',
        'descripcion': 'Prosecretario Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '27E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ahashasueru',
        'nombre': 'Prosecretario T.C.',
        'descripcion': 'Prosecretario Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '27C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ahsdyherur',
        'nombre': 'Prosecretario D.S.',
        'descripcion': 'Prosecretario Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '27J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'hshpospjhposh',
        'nombre': 'Director Ejecutivo D.E.',
        'descripcion': 'Director Ejecutivo Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '28E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'dhsjststi',
        'nombre': 'Director Ejecutivo T.C.',
        'descripcion': 'Director Ejecutivo Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '28C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zasgastgwywery',
        'nombre': 'Director Ejecutivo D.S.',
        'descripcion': 'Director Ejecutivo Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '28J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'aeueajazjuae',
        'nombre': 'Asistente \"A\" D.E.',
        'descripcion': 'Asistente \"A\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '29E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'xfgjfxjrtj',
        'nombre': 'Asistente \"A\" T.C.',
        'descripcion': 'Asistente \"A\" Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '29C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'xfgjrsusrtu',
        'nombre': 'Asistente \"A\" D.S.',
        'descripcion': 'Asistente \"A\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '29J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'qwrupagasg',
        'nombre': 'Asistente \"B\" D.E.',
        'descripcion': 'Asistente \"B\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '30E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ausweyweysdhsdx',
        'nombre': 'Asistente \"B\" T.C.',
        'descripcion': 'Asistente \"B\" Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '30C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ewyweywyeahsd',
        'nombre': 'Asistente \"B\" D.S.',
        'descripcion': 'Asistente \"B\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '30J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zjzjerueru',
        'nombre': 'Asistente \"C\" D.E.',
        'descripcion': 'Asistente \"C\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '31E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ueruwujwew',
        'nombre': 'Asistente \"C\" D.S.',
        'descripcion': 'Asistente \"C\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '31J',
        'puntos': 0
      })
    ];
  }

  desginacionesPendientes(lids): Observable<any[]> {
    let d = [
      {
        lugar: {
          id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
          nombre: 'DiTeSI'
        }, 
        designaciones: [
          { 
            usuario: { id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4', nombre: 'Walter', apellido: 'Blanco', dni: ''  },
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
          nombre: 'Economia'
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
            id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
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
              lugar_id: 'dd9dfc98-a4a0-49a3-9d6d-18eb634ea0d4',
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
    console.log('filtrando lugares: ' + texto);
    let lugares_filtrados = lugares.filter( v => v.nombre.toLowerCase().includes(texto.toLowerCase()));
    return of(lugares_filtrados).delay(1500);
  }  


  obtenerPuntosPersona(uid: string): Observable<number> {
    return of(34);
  }

  obtenerCargosDisponibles(): Observable<Cargo[]> {
    return of(this.tipos_cargos);
  }
  
  obtenerCaracter(): Observable<Caracter[]> {
    return of(this.tipos_caracter);
  }
}
