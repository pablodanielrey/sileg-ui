import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { UsuariosService } from '../../shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-sinc',
  templateUrl: './usuarios-sinc.component.html',
  styleUrls: ['./usuarios-sinc.component.css']
})
export class UsuariosSincComponent implements OnInit {

  cargando : boolean = false;
  columnas$ : BehaviorSubject<string[]> = null;
  columnas_error$ : BehaviorSubject<string[]> = null;
  errores$ : BehaviorSubject<any> = null;
  respuestas$: BehaviorSubject<any[]> = null;

  constructor(private service: UsuariosService) { 
    this.columnas$ = new BehaviorSubject([]);
    this.columnas_error$ = new BehaviorSubject([]);
    this.respuestas$ = new BehaviorSubject([]);
    this.errores$ = new BehaviorSubject([]);
  }

  ngOnInit() {
    this.service.sincronizacion_detalle().subscribe(rs => {
      this.columnas$.next(['fecha','hora','nombre','emails','aliases','usuario_id']);
      this.respuestas$.next(rs['respuestas']);
      this.columnas_error$.next(['fecha','hora','error','descripcion','usuario_id']);
      this.errores$.next(rs['errores']);
    });
  }

  obtenerAliases(r):string[] {
    let aliases = [];
    if (r.alias != undefined) {
      aliases.push(r.alias);
    }
    if (r.aliases != undefined) {
      aliases = r.aliases;
    }
    return aliases;
  }

  obtenerEmails(r):string[] {
    let emails = [];
    if (r.emails != undefined) {
      r.emails.forEach(e => {
        emails.push(e.address);
      });
    }
    return emails;
  }

  volver() {

  }

  _ordenar(rs, e):any[] {
    if (e.active != 'fecha' && e.active != 'hora') {
      return rs;
    }
    let v : any[] = rs.sort((a,b) => {
      if (a == null) {
        return -1;
      }
      if (b == null) {
        return 1;
      }
      if (a.creado == b.creado) {
        return 0;
      }
      if (a.creado < b.creado) {
        if (e.direction == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }
      if (e.direction == 'asc') {
        return 1;
      } else {
        return -1;
      }
    })
    return v;
  }

  ordenar(e) {
    let v = this._ordenar(this.respuestas$.value, e);
    this.respuestas$.next(v);
  }

  ordenar_errores(e) {
    let v = this._ordenar(this.errores$.value, e);
    this.errores$.next(v);
  }


}
