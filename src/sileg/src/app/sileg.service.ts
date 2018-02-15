import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';


import { Usuario } from './entities/usuario'

const SILEG_API_URL = environment.silegApiUrl;

@Injectable()
export class SilegService {

  usuarios: Usuario[] = [];
  constructor(private http: HttpClient) { }

  buscarUsuarios(texto: string): Promise<Usuario[]> {
    return new Promise((resolve, reject) => {
      const options = { params: new HttpParams().set('q', texto) };
      let apiUrl = `${SILEG_API_URL}/usuarios`;
      console.log(apiUrl);
      this.http.get<string[]>(apiUrl, options)
      .toPromise()
      .then(

        res => {
          console.log(res);
          // resolve(res.map(u => new Usuario(u)));
        }
      )
    });
  }

}
