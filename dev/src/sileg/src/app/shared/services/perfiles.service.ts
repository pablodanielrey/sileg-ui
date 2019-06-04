import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


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
    let perfiles = [];
    let i_perfiles = localStorage.getItem('perfiles');
    if (i_perfiles != null) {
      perfiles = JSON.parse(i_perfiles);
    }
    return of(perfiles.includes(perfil)).pipe(distinctUntilChanged());
  }

  configurar(perfil:Perfil):Observable<void> {
    let perf = localStorage.getItem('perfiles');
    if (perf == null) {
      perf = "[]";
    }
    let lista_perfiles = JSON.parse(perf);
    if (!lista_perfiles.includes(perfil)) {
      lista_perfiles.push(perfil)
    }
    perf = JSON.stringify(lista_perfiles)
    localStorage.setItem('perfiles', perf);
    return of();
  }

  perfiles():Observable<Perfil[]> {
    let ps = []
    for (var e in Perfil) {
      ps.push(Perfil[e]);
    }
    return of(ps).pipe(
      distinctUntilChanged()      
    );
  }

}
