import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';
import { Http } from '@angular/http'

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const LOGIN_API_URL = environment.loginApiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  sincronizacion_detalle():Observable<any> {
    let apiUrl = `${LOGIN_API_URL}/usuarios/sincronizar_google/detalle`;
    return this.http.get<any>(apiUrl).pipe(map(rs => {
      rs.respuestas.forEach(e => {
        e.creado = new Date(e.creado);
      });
      rs.errores.forEach(e => {
        e.creado = new Date(e.creado);
      });
      return rs;
    }));
  }

  detalle_recuperar_clave():Observable<any[]> {
    let apiUrl = `${LOGIN_API_URL}/recuperar_clave/detalle`;
    return this.http.get<any[]>(apiUrl).pipe(map(rs => {
      rs.forEach(e => {
        if (e.creado != null) {
          e.creado = new Date(e.creado);  
        }
        if (e.actualizado != null) {
          e.actualizado = new Date(e.actualizado);
        }
        if (e.confirmado != null) {
          e.confirmado = new Date(e.confirmado);
        }
      });
      return rs;
    }));
  }

}
