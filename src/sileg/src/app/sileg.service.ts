import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';
import { Http } from '@angular/http'


import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

import { Usuario } from './entities/usuario';
import { Sileg, DatosSileg } from './entities/sileg';

const SILEG_API_URL = environment.silegApiUrl;
const USER_API_URL = environment.userApiUrl;

@Injectable()
export class SilegService {

  //usuarios: Usuario[] = [];
  constructor(private http: HttpClient) { }

  buscarUsuarios(texto:string): Observable<DatosSileg[]> {
    const options = { params: new HttpParams()
              .set('q', texto ? texto : 'algoquenoexiste')
              //.set('limit', 10)
              //.set('offset',0)
          };
    let apiUrl = `${SILEG_API_URL}/usuarios`;
    return this.http.get<DatosSileg[]>(apiUrl, options).map(datos => datos.map(d => new DatosSileg(d)));
  }

  generarClave(uid:string):Observable<Response> {
    let apiUrl = `${USER_API_URL}/generar_clave/${uid}`;
    return this.http.get(apiUrl)
                .map((res: Response) => res.json())
                .catch((error:any) => Observable.throw(error.error || 'Server Error'));
  }


  /*
  buscarUsuarios(texto: string): Promise<DatosSileg[]> {
    return new Promise((resolve, reject) => {
      const options = { params: new HttpParams().set('q', texto ? texto : '') };
      let apiUrl = `${SILEG_API_URL}/usuarios`;
      console.log(apiUrl);
      this.http.get<string[]>(apiUrl, options)
      .toPromise()
      .then(
        res => {
          let datos = res.map(d => new DatosSileg(d));
          resolve(datos);
          //let usuarios = datos.map(d => new Usuario(d.usuario));
          //resolve(usuarios);
        }
      )
    });
  }
  */

}
