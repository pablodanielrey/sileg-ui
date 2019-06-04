import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http'


import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/Rx';

import { Mail, Usuario, ResetClave } from '../entities/usuario';
import { Sileg, DatosSileg, Lugar, PedidoDesignacion, Designacion, Cargo, DatosLugarDesignaciones, DatoDesignacion, Dato2Designacion, Configuracion, Caracter, DatosDesignacion, DatosLugarDesignacion } from '../entities/sileg';

const SILEG_API_URL = environment.silegApiUrl;
const LOGIN_API_URL = environment.loginApiUrl;
const USUARIO_API_URL = environment.usuarioApiUrl;

@Injectable()
export class SilegService {
  
  constructor(private http: HttpClient) { }

  detalleDesignacion(id): Observable<DatosDesignacion[]> {
    return null;
  }

  designacionesPendientes(lids): Observable<DatosLugarDesignacion[]> {
    return null;
  }

  obtenerDesignaciones(lids: string[], pendientes: boolean, actuales: boolean): Observable<DatosLugarDesignacion[]> {
    return null;
  }

  obtenerDesignacion(id: string): Observable<Designacion> {
    return null;
  }

  obtenerPersona(uid: string): Observable<any> {
    return null;
  }
  
  buscarPersonas(texto: string): Observable<any[]> {
    return null;
  }

  crearPersona(data: any): Observable<Usuario> {
    return null;
  }

  obtenerLugar(lid: string): Observable<any> {
    return null;
  }

  buscarLugares(texto: string): Observable<any[]> {
    return null;
  }

  obtenerPuntosPersona(uid: string): Observable<number> {
    return null;
  }

  obtenerCargosDisponibles(): Observable<Cargo[]> {
    return null;
  }

  obtenerCaracter(): Observable<Caracter[]> {
    return null;
  }  

  obterTipoLugar(): Observable<string[]> {
    return null;
  }

  guardarLugar(lugar: Object): Observable<string> {
    return null;
  }

  aprobarMovimiento(mid: string): Observable<boolean> {
    return null;
  }

  denegarMovimiento(mid: string): Observable<boolean> {
    return null;
  }

  cancelarMovimiento(mid: string): Observable<boolean> {
    return null;
  }

  bajaMovimiento(mid: string): Observable<boolean> {
    return null;
  }

  enviarUnlpMovimiento(mid: string): Observable<boolean> {
    return null;
  }

  verificarPrestacion(mid: string): Observable<boolean> {
    return null;
  }

  modificarMovimiento(id: string, cargo: Cargo, caracter: Caracter): Observable<string> {
    return null;
  }

  crearDesignacion(data: any, lid: string, u: Usuario): Observable<string> {
    return null;
  }
}
