import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export enum Perfil {
  DEPARTAMENTO = 'departamento',
  AUTORIDAD = 'autoridad',
  MESA_DE_ENTRADAS = 'mesa_de_entradas',
  DESPACHO = 'despacho',
  PERSONAL = 'personal',
  PERSONA = 'persona'
} 

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor() { }

  es(perfil:Perfil):Observable<boolean> {
    return of(true);
  }

  configurar(perfil:Perfil):Observable<void> {
    return of();
  }

  perfiles():Observable<Perfil[]> {
    let ps = [];
    for (var e in Perfil) {
      ps.push(e);
    }
    return of(ps);
  }

}
