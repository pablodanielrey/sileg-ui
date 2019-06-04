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

  private _obtener_lista_perfiles() {
    let perf = localStorage.getItem('perfiles');
    if (perf == null) {
      perf = "[]";
    }
    let lista_perfiles = JSON.parse(perf);
    return lista_perfiles;
  }

  private _setear_lista_perfiles(perfiles) {
    let perf = JSON.stringify(perfiles)
    localStorage.setItem('perfiles', perf);
  }


  es(perfil:Perfil):Observable<boolean> {
    let perfiles = this._obtener_lista_perfiles();
    return of(perfiles.includes(perfil)).pipe(distinctUntilChanged());
  }

  eliminar(perfil:Perfil):Observable<void> {
    let perfiles = this._obtener_lista_perfiles();
    if (perfiles.includes(perfil)) {
      let nuevos_perfiles = perfiles.filter(p => p != perfil);
      this._setear_lista_perfiles(nuevos_perfiles);
    }
    return of();
  }

  configurar(perfil:Perfil):Observable<void> {
    let lista_perfiles = this._obtener_lista_perfiles();
    if (!lista_perfiles.includes(perfil)) {
      lista_perfiles.push(perfil)
      this._setear_lista_perfiles(lista_perfiles);
    }
    return of();
  }

  perfiles():Observable<Perfil[]> {
    let ps = []
    for (var e in Perfil) {
      ps.push(Perfil[e]);
    }
    return of(ps);
  }

}
