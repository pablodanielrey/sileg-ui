import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http'


import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { Mail, Usuario, ResetClave } from '../entities/usuario';
import { Sileg, DatosSileg, Lugar, PedidoDesignacion, Designacion, Cargo, DatosLugarDesignaciones, DatoDesignacion, Dato2Designacion, Configuracion, Caracter, Estado, DatosLugarDesignacion, DatosDesignacion } from '../entities/sileg';
import { ok } from 'assert';

const SILEG_API_URL = environment.silegApiUrl;
const LOGIN_API_URL = environment.loginApiUrl;
const USUARIO_API_URL = environment.usuarioApiUrl;

interface EstadoI {
  tipo: string,
  estado: string,
  final: boolean,
  codigo: string,
  estilo: string
}


@Injectable()
export class SilegService {

  tipos_cargos:Array<Cargo> = [];
  tipos_caracter: Array<Caracter> = [];
  lugares: Array<Lugar> = [];
  designaciones: Array<Designacion> = [];

  tipos_estado: Array<EstadoI> = [
    {tipo:'Alta', estado:'Pendiente', final:false, codigo:'', estilo:''}, 
    {tipo:'Alta', estado:'Aprobada', final:false, codigo:'', estilo:''}, 
    {tipo:'Alta', estado:'Enviada a UNLP', final:false, codigo:'', estilo:''},
    {tipo:'Alta', estado:'Denegada', final:false, codigo:'', estilo:''},
    {tipo:'Alta', estado:'Cancelada', final:false, codigo:'', estilo:''},
    {tipo:'Baja', estado:'Pendiente', final:false, codigo:'', estilo:''},
    {tipo:'Baja', estado:'Aprobada', final:false, codigo:'', estilo:''},
    {tipo:'Baja', estado:'Enviada a UNLP', final:false, codigo:'', estilo:''},
    {tipo:'Baja', estado:'Cancelada', final:false, codigo:'', estilo:''},
    {tipo:'Baja', estado:'Denegada', final:false, codigo:'', estilo:''},
    {tipo:'Alta', estado:'', final:true, codigo:'', estilo:''}, 
    {tipo:'Baja', estado:'', final:true, codigo:'', estilo:''}
  ];

  /*
  tipos_estado: Array<string> = [
    'Alta Pendiente', 'Alta Aprobada', 'Alta Enviada a UNLP',
    'Baja Pendiente', 'Baja Aprobada', 'Baja Enviada a UNLP',
    'Activa', 'Baja'
  ];
  */

  datos_lugar_designacion: Array<DatosLugarDesignacion> = [];
  datos_designacion:Array<DatosDesignacion> = [];
  catedras: Array<Lugar> = [];
  usuarios: Array<Usuario> = [];
  tipos_lugar = [
    'area', 'catedra', 'categoria', 'departamento', 'direccion', 'division', 'facultad',
    'instituto', 'lugar', 'lugar dictado', 'oficina', 'secretaria'
  ]  

  tipos_designacion = [
    'prorroga', 'original', 'reemplaza a', 'extension', 'baja'
  ]
  
  constructor(private http: HttpClient) {
    this.setear_usuarios();
    this.setear_cargos();
    this.setear_caracter();
    this.setear_lugares();
    this.setear_designaciones();
  }
   
  private setear_usuarios() {
    this.usuarios = [
      new Usuario({
        id: 'd44e92c1-d277-4a45-81dc-a72a76f6ef8d',
        nombre: 'Ivan cesar',
        apellido: 'Castaneda',
        dni: '31073351',
        genero: 'Masculino',
        mails: [new Mail({email: 'ivan.castaneda@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '89d88b81-fbc0-48fa-badb-d32854d3d93a',
        nombre: 'Pablo daniel',
        apellido: 'Rey',
        dni: '27294557',
        genero: 'Masculino',
        mails: [new Mail({email: 'pablo@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '0cd70f16-aebb-4274-bc67-a57da88ab6c7',
        nombre: 'Emanuel Joaquin',
        apellido: 'Pais',
        dni: '31381082',
        genero: 'Masculino',
        mails: [new Mail({email: 'emanuel@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '205de802-2a15-4652-8fde-f23c674a1246',
        nombre: 'Walter',
        apellido: 'Blanco',
        dni: '30001823',
        genero: 'Masculino',
        mails: [new Mail({email: 'walter.blanco@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '13b2471b-507e-44d7-a440-efdb66d5aaa8',
        nombre: 'Leonardo',
        apellido: 'Consolini',
        dni: '34770038',
        genero: 'Masculino',
        mails: [new Mail({email: 'leonardo.consolini@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '3ca3057b-adba-49b3-8b99-550311fc9c81',
        nombre: 'Miguel',
        apellido: 'Macagno',
        dni: '34928857',
        genero: 'Masculino',
        mails: [new Mail({email: 'miguel.macagno@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: '35f7a8a6-d844-4d6f-b60b-aab810610809',
        nombre: 'Alejandro agustin',
        apellido: 'Oporto',
        dni: '29694757',
        genero: 'Masculino',
        mails: [new Mail({email: 'alejandro@econo.unlp.edu.ar'})]   
      }),
      new Usuario({
        id: 'cd8fbf39-4ad2-4d11-b17b-3b070105f870',
        nombre: 'Maximiliano',
        apellido: 'Saucedo',
        dni: '27821597',
        genero: 'Masculino',
        mails: [new Mail({email: 'maxi.saucedo@econo.unlp.edu.ar'})]   
      })
    ];
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
        'nombre': 'Titular',
        'dedicacion': 'D.E.',
        'descripcion': 'Profesor Titular Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '05E',
        'puntos': 100
      }),
      new Cargo({
        'id': 'eeceeac9-12c1-479f-a8eb-a88aa19d286c',
        'nombre': 'Asociado',
        'dedicacion': 'D.E.',
        'descripcion': 'Profesor Asociado Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '06E',
        'puntos': 89.37
      }),
      new Cargo({
        'id': '',
        'nombre': 'Adjunto',
        'dedicacion': 'D.E.',
        'descripcion': 'Profesor Adjunto Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '07E',
        'puntos': 78.74
      }),
      new Cargo({
        'id': '4680eeea-e534-4515-91d0-e7b456397b68',
        'nombre': 'JTP',
        'dedicacion': 'D.E.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '08E',
        'puntos': 68.10
      }),
      new Cargo({
        'id': 'b4c0d4b6-923f-4f55-8b0a-053e5864e525',
        'nombre': 'Ayudante 1º',
        'dedicacion': 'D.E.',
        'descripcion': 'Ayudante Diplomado Dedicación Exclusiva',
        'tipo': 'Docente',
        'codigo': '09E',
        'puntos': 57.47
      }),
      new Cargo({
        'id': '015d50a9-b3db-4119-b20d-a931ee377e8b',
        'nombre': 'Titular',
        'dedicacion': 'S.E.',
        'descripcion': 'Profesor Titular Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '05S',
        'puntos': 50
      }),
      new Cargo({
        'id': '6341dd1e-d57e-4378-a9fa-c7a6cc66f336',
        'nombre': 'Asociado',
        'dedicacion': 'S.E.',
        'descripcion': 'Profesor Asociado Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '06S',
        'puntos': 44.68
      }),
      new Cargo({
        'id': 'd1a0e4a7-03ca-40a9-a98c-d89cdc322d9a',
        'nombre': 'Adjunto',
        'dedicacion': 'S.E.',
        'descripcion': 'Profesor Adjunto Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '07S',
        'puntos': 39.37
      }),
      new Cargo({
        'id': '5fa3f450-f379-41b8-9b34-26b5e14edc3f',
        'nombre': 'JTP',
        'dedicacion': 'S.E.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '08S',
        'puntos': 34.05
      }),
      new Cargo({
        'id': '37df5825-6640-4568-965e-4478b49e9868',
        'nombre': 'Ayudante 1º',
        'dedicacion': 'S.E.',
        'descripcion': 'Ayudante Diplomado Dedicación Semiexclusiva',
        'tipo': 'Docente',
        'codigo': '09S',
        'puntos': 28.74
      }),
      new Cargo({
        'id': 'ca0c7105-ade2-4fab-b14c-086248b7a447',
        'nombre': 'Titular',
        'dedicacion': 'D.S.',
        'descripcion': 'Profesor Titular Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '05X',
        'puntos': 25
      }),
      new Cargo({
        'id': 'b65f8e8b-80ee-4ff8-9bf2-f04ba2bdd397',
        'nombre': 'Asociado',
        'dedicacion': 'D.S.',
        'descripcion': 'Profesor Asociado Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '06X',
        'puntos': 22.34
      }),
      new Cargo({
        'id': 'b65f8e8b-80ee-4ff8-9bf2-f04ba2bdd397',
        'nombre': 'Adjunto',
        'dedicacion': 'D.S.',
        'descripcion': 'Profesor Adjunto Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '07X',
        'puntos': 19.68
      }),
      new Cargo({
        'id': '718e8e33-2989-4337-8d79-2609268d315e',
        'nombre': 'JTP',
        'dedicacion': 'D.S.',
        'descripcion': 'Jefe de Trabajos Prácticos Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '08X',
        'puntos': 17.03
      }),
      new Cargo({
        'id': 'dbf391cd-1212-4e40-a795-f466b0c2406d',
        'nombre': 'Ayudante 1º',
        'dedicacion': 'D.S.',
        'descripcion': 'Ayudante Diplomado Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '09X',
        'puntos': 14.37
      }),
      new Cargo({
        'id': '750780c1-496a-4ca9-bcb7-9b3835f205c1',
        'nombre': 'Ayudante 2º',
        'dedicacion': 'D.S.',
        'descripcion': 'Ayudante Alumno Dedicación Simple',
        'tipo': 'Docente',
        'codigo': '10X',
        'puntos': 11.49
      }),
      new Cargo({
        'id': 'aad',
        'nombre': 'Decano',
        'dedicacion': 'D.E.',
        'descripcion': 'Decano Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '02E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'bdffas',
        'nombre': 'Decano',
        'dedicacion': 'T.C.',
        'descripcion': 'Decano Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '02C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zxvaas',
        'nombre': 'Decano',
        'dedicacion': 'T.P.',
        'descripcion': 'Decano Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '02P',
        'puntos': 0
      }),
      new Cargo({
        'id': 'asfgewt',
        'nombre': 'Decano',
        'dedicacion': 'D.S.',
        'descripcion': 'Decano Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '02J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'agwhrey',
        'nombre': 'Vice-Decano',
        'dedicacion': 'D.E.',
        'descripcion': 'Vice-Decano Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '02S',
        'puntos': 0
      }),
      new Cargo({
        'id': 'jkjkllsdgj',
        'nombre': 'Vice-Decano',
        'dedicacion': 'T.C.',
        'descripcion': 'Vice-Decano Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '02K',
        'puntos': 0
      }),
      new Cargo({
        'id': 'psitsetds',
        'nombre': 'Vice-Decano',
        'dedicacion': 'T.P.',
        'descripcion': 'Vice-Decano Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '02X',
        'puntos': 0
      }),
      new Cargo({
        'id': 'iashah',
        'nombre': 'Vice-Decano',
        'dedicacion': 'D.S.',
        'descripcion': 'Vice-Decano Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '02I',
        'puntos': 0
      }),
      new Cargo({
        'id': 'dgagadsgh',
        'nombre': 'Secretario',
        'dedicacion': 'D.E.',
        'descripcion': 'Secretario Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '04E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'nklasdgk',
        'nombre': 'Secreatario',
        'dedicacion': 'T.C.',
        'descripcion': 'Secretario Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '04C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'sdvjoseg',
        'nombre': 'Secreatario',
        'dedicacion': 'T.P.',
        'descripcion': 'Secretario Facultad Tiempo Parcial',
        'tipo': 'Autoridad Superior',
        'codigo': '04P',
        'puntos': 0
      }),
      new Cargo({
        'id': 'asfafgqwqf',
        'nombre': 'Secreatario',
        'dedicacion': 'D.S.',
        'descripcion': 'Secretario Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '04J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'fqptqwtwse',
        'nombre': 'Prosecretario',
        'dedicacion': 'D.E.',
        'descripcion': 'Prosecretario Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '27E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ahashasueru',
        'nombre': 'Prosecretario',
        'dedicacion': 'T.C.',
        'descripcion': 'Prosecretario Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '27C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ahsdyherur',
        'nombre': 'Prosecretario',
        'dedicacion': 'D.S.',
        'descripcion': 'Prosecretario Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '27J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'hshpospjhposh',
        'nombre': 'Director Ejecutivo',
        'dedicacion': 'D.E.',
        'descripcion': 'Director Ejecutivo Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '28E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'dhsjststi',
        'nombre': 'Director Ejecutivo',
        'dedicacion': 'T.C.',
        'descripcion': 'Director Ejecutivo Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '28C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zasgastgwywery',
        'nombre': 'Director Ejecutivo',
        'dedicacion': 'D.S.',
        'descripcion': 'Director Ejecutivo Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '28J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'aeueajazjuae',
        'nombre': 'Asistente \"A\"',
        'dedicacion': 'D.E.',
        'descripcion': 'Asistente \"A\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '29E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'xfgjfxjrtj',
        'nombre': 'Asistente \"A\"',
        'dedicacion': 'T.C.',
        'descripcion': 'Asistente \"A\" Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '29C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'xfgjrsusrtu',
        'nombre': 'Asistente \"A\"',
        'dedicacion': 'D.S.',
        'descripcion': 'Asistente \"A\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '29J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'qwrupagasg',
        'nombre': 'Asistente \"B\"',
        'dedicacion': 'D.E.',
        'descripcion': 'Asistente \"B\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '30E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ausweyweysdhsdx',
        'nombre': 'Asistente \"B\"',
        'dedicacion': 'T.C.',
        'descripcion': 'Asistente \"B\" Facultad Tiempo Completo',
        'tipo': 'Autoridad Superior',
        'codigo': '30C',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ewyweywyeahsd',
        'nombre': 'Asistente \"B\"',
        'dedicacion': 'D.S.',
        'descripcion': 'Asistente \"B\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '30J',
        'puntos': 0
      }),
      new Cargo({
        'id': 'zjzjerueru',
        'nombre': 'Asistente \"C\"',
        'dedicacion': 'D.E.',
        'descripcion': 'Asistente \"C\" Facultad Dedicación Exclusiva',
        'tipo': 'Autoridad Superior',
        'codigo': '31E',
        'puntos': 0
      }),
      new Cargo({
        'id': 'ueruwujwew',
        'nombre': 'Asistente \"C\"',
        'dedicacion': 'D.S.',
        'descripcion': 'Asistente \"C\" Facultad Dedicación Simple',
        'tipo': 'Autoridad Superior',
        'codigo': '31J',
        'puntos': 0
      })
    ];
  }

  setear_lugares(): void {
    this.lugares = [
      new Lugar({
        id: '2dc45e33-1433-43ef-ac44-61300611e5e5',
        nombre: 'secretaría academica',
        padre_id:'2b3fab6f-5545-453a-b672-4539d6850bab'
      }),
      new Lugar({
        id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2',
        nombre: 'Departamento De Economía',
        padre_id: '2dc45e33-1433-43ef-ac44-61300611e5e5'
      }),
      new Lugar({
        id: '5a765400-9b2d-4eb4-91d3-ac861a7eb608',
        nombre: 'Microeconomía I',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: '48733c04-ad4e-40c9-8662-8d0eae1f931a',
        nombre: 'Política Económica I',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: 'b72240ab-9b85-440c-b15d-496c5e3c765d',
        nombre: 'Economía Espacial',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: '1e751435-9671-4568-b61e-5dd22efa377b',
        nombre: 'Teoría del Desarrollo Económico',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: '917d0319-89b1-460c-bd9d-3c9e4898344f',
        nombre: 'Microeconomía II',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: 'aa6c569d-1e90-46f1-8842-37f0caa8245d',
        nombre: 'Macroeconomía I',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2',
        tipo: 'catedra'
      }),
      new Lugar({
        id: 'b422f980-10da-4fd3-98c8-0fdb8f4aeaae',
        nombre: 'Política Económica Mundial',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: '04cc186e-6a3a-4d29-8340-83ec257efdf0',
        nombre: 'Teoría Económica Coyuntural',
        padre_id: 'a7498331-3afd-4881-b899-25ff2b8dd0f2'
      }),
      new Lugar({
        id: '9f09b08d-607a-4192-bc54-5cc5db16ad39',
        nombre: 'Departamento De Ciencias Administrativas',
        padre_id: '2dc45e33-1433-43ef-ac44-61300611e5e5'
      }),
      new Lugar({
        id: '1c6b8b9d-c41d-4956-8ab0-9ef2ffc4cd6f',
        nombre: 'Finanzas de Empresas I',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '8333a81a-17bc-4b9d-8798-d7f59b502f39',
        nombre: 'Administración I A',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: 'ada09687-6a3b-447a-a2a6-aaf58c7a2a66',
        nombre: 'Administración I B',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: 'd6ac5bea-d89d-406b-88a4-a5b2ce90e4f3',
        nombre: 'Administración I C',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '970e888b-8c32-4fee-b086-8a90e6721cd8',
        nombre: 'Sistemas de Información',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '0a588198-1635-4c39-9d98-7f85bcbaa4c5',
        nombre: 'Psicología Organizacional',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: 'de9f0747-c0bb-4f88-8ef6-f1c97f323e35',
        nombre: 'Política y Derecho Social',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '9647a6cb-e0e9-4061-9312-c8ce9f8771b6',
        nombre: 'Administración Pública I',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '03799b05-f054-475b-98ff-a34c1ff81634',
        nombre: 'Administración Pública II',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: '854f44c5-4da7-4425-a496-6dfb31079f65',
        nombre: 'Administración de Organizaciones de Salud',
        padre_id: '9f09b08d-607a-4192-bc54-5cc5db16ad39'
      }),
      new Lugar({
        id: 'c0081511-2edc-4323-880d-848162679889',
        nombre: 'Departamento De Contabilidad',
        padre_id: '2dc45e33-1433-43ef-ac44-61300611e5e5'
      }),
      new Lugar({
        id: 'bbd9ba0b-90ba-4931-9d4a-a2f584111e76',
        nombre: 'Interpretacion de los Estados Contables (Plan VII) A',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: '457c3afa-2e51-43a6-b8e3-18b0c63f94ac',
        nombre: 'Interpretacion de los Estados Contables (Plan VII) B',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: 'ee65341d-71b4-4168-ac0e-a34ecd24bc03',
        nombre: 'Interpretacion de los Estados Contables (Plan VII) C',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: '228d1381-b2b4-4043-8e30-28738f9397d8',
        nombre: 'Actuación Judicial',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: '4ae14404-80ff-46f4-bbd4-0e1810db01c0',
        nombre: 'Estructura Economica Societaria',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: '831e6ec8-ec53-4369-aca7-37fe725f0cac',
        nombre: 'Contabilidad VIII (Auditoría)',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: 'ccc5af80-5925-4d78-909a-18d178d55d51',
        nombre: 'Contabilidad IV (Hacienda Pública)',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: '5a114271-1022-42ec-9832-cace79f265da',
        nombre: 'Auditoría Siglo XXI',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      }),
      new Lugar({
        id: 'b451eae8-268a-4204-9deb-5dfa7a589f2e',
        nombre: 'Actuación Laboral',
        padre_id: 'c0081511-2edc-4323-880d-848162679889'
      })
    ]

    this.catedras = this.lugares.filter( l => 
      !(l.nombre.includes('Departamento') || l.nombre.includes('secretaría'))
    );

  }
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  private uuid(): string {
    return this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' +this.S4() + this.S4()
  }

  private generar_expediente(estado: EstadoI): string {
    if (estado.estado.includes('Pendiente') || estado.estado.includes('Aprobada')) {
      return ''
    }
    let exp = ['900-7715/13', '900-7898/13', '900-7898/13', '900-7898/13', '900-7687/13',
    '900-7687/13', '900-8010/13', '900-8010/13', '900-8059/13', '900-8062/13', '900-8062/13',
    '900-7773/13', '900-7773/13', '900-7772/13', '900-7772/13', '900-8060/13', '900-8060/13',
    '900-7937/13', '900-398/09', '900-398/09', '900-4471/11', '900-2096/10', '900-2096/11',
    '900-398/09', '900-3643/11', '900-2096/10', '900-2096/11', '900-17993/96', '900-399/14',
    '900-20403/99', '900-4988/08', '900-4988/08', '900-4988/08', '900-20626/99', '900-20626/99',
    '900-882/14', '900-2097/10', '900-2097/11', '900-2097/12', '900-2097/13', '900-882/14',
    '900-882/14', '900-927/09', '900-927/09', '900-927/09', '900-16998/95', '900-3362/11'];
    return exp[Math.floor(Math.random() * exp.length)];
  }

  private generar_resolucion(estado:EstadoI): string {
    if (estado.estado.includes('Pendiente') || estado.estado.includes('Aprobada')) {
      return ''
    }
    let res = ['643/13', '640/13', '644/15', '644/15', '645/13', '995/14', '706/13', '706/13',
      '657/13', '660/13', '660/13', '663/13', '663/13', '664/13', '664/13', '658/13', '711/14',
      '633/13', '451/09', '451/09', '022/12', '568/10', '351/11', '451/09', '451/09', '505/11',
      '568/10', '351/11', '528/97', '229/14', '569/00', '373/09', '299/09', '483/11', '404/08',
      '655/15', '568/10', '332/11', '441/12', '565/13', '514/14', '655/15', '491/09', '903/14',
      '315/96', '334/11', '638/00', '717/13', '316/96', '612/14', '1017/16', '358/17', '1151/18',
      '766/07', '886/07', '328/09', '764/05', '834/14', '360/10', '557/00', '599/13', '726/08'          
    ];    
    let aux = (estado.tipo == 'Activa') ? res : res.concat(['']);
    return aux[Math.floor(Math.random() * aux.length)];
  }

  private generar_usuario() {
    return this.usuarios[Math.floor(Math.random() * this.usuarios.length)];
  }

  private cant_desig_lug = {};
  private obtener_catedra(): Lugar {    
    let l = this.catedras[Math.floor(Math.random() * this.catedras.length)];
    if (!(l.id in this.cant_desig_lug) || this.cant_desig_lug[l.id] < this._obtener_max()) {
      this.cant_desig_lug[l.id] = (l.id in this.cant_desig_lug) ? this.cant_desig_lug[l.id] + 1 : 1;
      return l;
    } else {
      return this.obtener_catedra();
    }
  }

  private _obtener_max() {
    let cant = this.tipos_cargos.length * this.tipos_caracter.length * this.tipos_estado.length;
    return cant / this.catedras.length
  }

  private generar_tipo_designacion() {
    return this.tipos_designacion[Math.floor(Math.random() * this.tipos_designacion.length)];
  }

  private setear_designaciones(): void {    
    this.tipos_cargos.filter( x => x.tipo == 'Docente').forEach(cargo => {
      this.tipos_caracter.forEach( caracter => {
        this.tipos_estado.forEach( estado => {
          let l = this.obtener_catedra();
          let u = this.generar_usuario();
          let f = Math.floor(Math.random() * 365 * 20);
          let d = new Designacion({
              id: this.uuid(),
              usuario_id: u.id,
              usuario: u,
              cargo_id: cargo.id,
              cargo: cargo,
              caracter_id: caracter.id,
              caracter: caracter,
              lugar_id: l.id,
              lugar: l,
              tipo: this.generar_tipo_designacion(),
              desde: new Date((new Date()).getTime() - (f * 24 * 360000)) ,
              expediente: this.generar_expediente(estado),
              resolucion: this.generar_resolucion(estado)
          });
          this.designaciones.push(d);
          this.datos_designacion.push(new DatosDesignacion({
            usuario: u,
            designacion: d,
            estado: new Estado({tipo:estado.tipo, estado:estado.estado})
          }));

        })
      })
    });
    this.datos_lugar_designacion = [];
    let dl_desig_map = {};
    this.datos_designacion.forEach(d => {
      if (d.designacion.lugar_id in dl_desig_map) {
        let dld = dl_desig_map[d.designacion.lugar_id];
        dld.designaciones.push(d);
        dld.puntos_alta = parseFloat((dld.puntos_alta + ((d.estado.tipo.includes('Alta')) ? d.designacion.cargo.puntos : 0)).toFixed(2));
        dld.puntos_baja = parseFloat((dld.puntos_baja + ((d.estado.tipo.includes('Baja')) ? d.designacion.cargo.puntos : 0)).toFixed(2));
      } else {
        dl_desig_map[d.designacion.lugar_id] = new DatosLugarDesignacion({
          designaciones: [d],
          lugar: d.designacion.lugar,
          puntos_alta: (d.estado.tipo.includes('Alta'))? d.designacion.cargo.puntos : 0,
          puntos_baja: (d.estado.tipo.includes('Baja'))? d.designacion.cargo.puntos : 0, 
        })
      }
    });
    Object.keys(dl_desig_map).forEach( d => {
      this.datos_lugar_designacion.push(dl_desig_map[d]);
    })
  }

  _sublugares(lids): string[] {
    let sublugares = [];
    for (let i=0; i<lids.length; i++) {
      let lid = lids[i];
      let aux = this.lugares.filter( l => l.padre_id == lid).map( l => l.id);
      sublugares = sublugares.concat(this._sublugares(aux));
      sublugares.push(lid);
    }    
    return sublugares;
  }

  desginacionesPendientes(lids: string[]): Observable<DatosLugarDesignacion[]> {
    let ids = this._sublugares(lids);
    return of(this.datos_lugar_designacion.filter( dl => ids.includes(dl.lugar.id)));
  }

  obtenerDesignacion(id: string): Observable<Designacion> {    
    return of(this.designaciones.find( d => d.id == id));
  }
  
  obtenerPersona(uid: string): Observable<any> {
    return of(this.usuarios.filter( u => u.id == uid));
  }

  buscarPersonas(texto: string): Observable<any[]> {
    let personas2 = this.usuarios.filter( v => 
        v.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        v.apellido.toLowerCase().includes(texto.toLowerCase()) ||
        v.dni.toLowerCase().includes(texto.toLocaleLowerCase())
      );
    return of(personas2);
  }  

  obtenerLugar(lid: string): Observable<any> {
    return of(this.lugares.find( l => l.id == lid)).delay(2000);
  }

  buscarLugares(texto: string): Observable<any[]> {
    let lugares_filtrados = this.lugares.filter( v => v.nombre.toLowerCase().includes(texto.toLowerCase()));
    return of(lugares_filtrados).delay(500);
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

  private crear_original(desig: DatoDesignacion): DatoDesignacion {
    let aux = new DatosDesignacion(JSON.parse(JSON.stringify(desig)));
    aux.designacion.tipo = 'original';
    aux.estado.tipo = 'Activa';
    aux.designacion.desde = new Date(new Date(aux.designacion.desde).getTime() - 1000 * 60 * 60 * 24 * 365 * 5);
    aux.designacion.lugar = new Lugar(aux.designacion.lugar);
    return aux;
  }

  detalleDesignacion(id): Observable<DatosDesignacion[]> {    
    let arr = []
    arr.push(this.datos_designacion.find( dd => dd.designacion.id == id));
    if (arr[0].designacion.tipo != "original") {
      arr.push(this.crear_original(arr[0]));
      let aux = this.crear_original(arr[1]);
      aux.designacion.lugar = this.lugares[5];
      arr.push(aux);
    }
    return of(arr);
  }

  obterTipoLugar(): Observable<string[]> {
    return of(this.tipos_lugar);
  }

  guardarLugar(lugar: Object): Observable<string> {
    let l = this.lugares.find( l => l.id == lugar["id"]);
    Object.assign(l, lugar);
    return of(l.id);
  }

  private obtenerDatosDesignacion(id: string): DatosDesignacion {
    return this.datos_designacion.find( dd => dd.designacion.id == id);
  }

  aprobarMovimiento(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);
    let ok = false;
    switch(dd.estado.tipo) {
      case 'Alta': dd.estado.estado = 'Aprobada'; ok = true; break;
      case 'Baja': dd.estado.estado = 'Aprobada'; ok = true; break;
    }
    return of(ok);
  }

  denegarMovimiento(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);
    dd.estado.estado = 'Denegada';
    return of(true);
  } 
  
  cancelarMovimiento(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);
    dd.estado.estado = 'Cancelada';
    return of(true);
  }  

  bajaMovimiento(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);
    dd.estado.tipo = 'Baja';    
    dd.estado.estado = 'Pendiente';
    return of(true);
  } 

  enviarUnlpMovimiento(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);
    let ok = false;
    switch(dd.estado.tipo) {
      case 'Alta': dd.estado.estado = 'Enviada a UNLP'; ok = true; break;
      case 'Baja': dd.estado.estado = 'Enviada a UNLP'; ok = true; break;
    }
    return of(ok);
  }  

  verificarPrestacion(mid: string): Observable<boolean> {
    let dd = this.obtenerDatosDesignacion(mid);    
    dd.estado.estado = 'Prestación Verificada';
    return of(true);
  }

  modificarMovimiento(id: string, cargo: Cargo, caracter: Caracter) {
    let d = this.designaciones.find( d => d.id == id);
    let c = this.tipos_cargos.find( c => c.nombre == cargo.nombre && c.dedicacion == cargo.dedicacion); 
    d.cargo = c;
    d.cargo_id = c.id;
    d.caracter = caracter;
    d.caracter_id = caracter.id;
    return of(id);
  }  

}
