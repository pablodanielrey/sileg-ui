import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios-sinc',
  templateUrl: './usuarios-sinc.component.html',
  styleUrls: ['./usuarios-sinc.component.css']
})
export class UsuariosSincComponent implements OnInit {

  cargando : boolean = false;
  columnas$ : BehaviorSubject<string[]> = null;
  errores$ : BehaviorSubject<any> = null;
  respuestas$: BehaviorSubject<any[]> = null;

  constructor(private service: UsuariosService) { 
    this.columnas$ = new BehaviorSubject([]);
    this.respuestas$ = new BehaviorSubject([]);
    this.errores$ = new BehaviorSubject([]);
  }

  ngOnInit() {
    this.service.sincronizacion_detalle().subscribe(rs => {
      console.log(rs);
      this.columnas$.next(['fecha','hora','nombre','emails','aliases','usuario_id']);
      this.respuestas$.next(rs['respuestas']);
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

  ordenar(e) {

  }

}
