import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, reduce, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';


const WARDEN_API_URL = environment.wardenApiUrl;

interface response {
  status: number,
  granted: string[],
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  expire_error = 10 * 1000;   // 10 segundos para los permisos cuando existe error.
  expire_ok = 60 * 10 * 1000; // 10 minutos para los permisos correctamente retornados

  constructor(private http: HttpClient) { 
  }

  _save_example() {
    let permissions = {
      status: 200,
      expire: new Date().getTime() + this.expire_ok,
      granted: ['urn:*:*:*']
    }
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  _load_perms(): Observable<string[]> {
    let perms = localStorage.getItem(`permissions`);
    if (perms != null) {
      let permissions = JSON.parse(perms);
      if (permissions.expire > new Date().getTime()) {
        return of(permissions.granted);
      }
    }
    let apiUrl = `${WARDEN_API_URL}/permissions`;
    return this.http.get<response>(apiUrl).pipe(
      catchError(e => of({status:500, expire:0, granted:[]})), 
      map(
        r => {
          let permissions = {
            status: r.status,
            expire: new Date().getTime() + this.expire_ok,
            granted: r.granted
          }
          if (permissions.status != 200) {
            permissions.granted = [];
            permissions.expire = new Date().getTime() + this.expire_error;
          }
          localStorage.setItem(`permissions`,JSON.stringify(permissions));
          return permissions.granted;
        }
      )
    );
  }

  _matches(p:string, perm:string) {
    /*
      Chequeo que p esté habilitado por perm, teniendo en cuenta los comodines.
    */
    let perms = perm.split(':');
    let system = perms[1];
    let r = perms[2];
    let action = perms[3];

    let toCheck = p.split(':')
    if (system == '*' || system == toCheck[1]) {
      if (r == '*' || r == toCheck[2]) {
        if (action == '*' || action == toCheck[3]) {
          return true;
        }
      }
    }
    return false;
  }

  has(p:string): Observable<boolean> {
    return this._load_perms().pipe(map(
      ps => {
        for (let perm of ps) {
          if (this._matches(p,perm)) {
            return true;
          }
        }
        return false;
      }
    ));
  }

  all(ps:string[]): Observable<boolean> {
    /*
      todos tienen que matchear
    */
    return this._load_perms().pipe(map(
      perms => {
        for (let p of ps) {
          let r = false;
          for (let perm of perms) {
            if (this._matches(p,perm)) {
              r = true;
              break;
            }
          }
          if (!r) {
            return false;
          }
        }
        return true;
      }
    ));
  }

  any(ps:string[]): Observable<boolean> {
    /*
      Con que matchee uno es suficiente
    */
    return this._load_perms().pipe(map(
      perms => {
        for (let p of ps) {
          for (let perm of perms) {
            if (this._matches(p,perm)) {
              return true;
            }
          }
        }
        return false;
      }
    ));
  }
}
