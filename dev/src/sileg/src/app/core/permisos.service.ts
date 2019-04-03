import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { 
  }

  _save_example() {
    localStorage.setItem('permissions', 'urn:*:*:*');
  }

  _load_perms(): Observable<string[]> {
    let perms = localStorage.getItem(`permissions`);
    if (perms != null) {
      let permissions = perms.split(';');
      return of(permissions);
    }
    let apiUrl = `${WARDEN_API_URL}/permissions`;
    return this.http.get<response>(apiUrl).pipe(map(
      r => {
          if (r.status != 200) {
          localStorage.setItem(`permissions`,'');
          return [];
        }
        localStorage.setItem(`permissions`, r.granted.join(';'));
        return r.granted;
      }
    ));
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
