import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login-sinc',
  templateUrl: './login-sinc.component.html',
  styleUrls: ['./login-sinc.component.css']
})
export class LoginSincComponent implements OnInit {

  cargando : boolean = false;
  columnas$ : BehaviorSubject<string[]> = null;
  columnas_error$ : BehaviorSubject<string[]> = null;
  errores$ : BehaviorSubject<any> = null;
  respuestas$: BehaviorSubject<any[]> = null;

  constructor(private service: LoginService) { 
    this.columnas$ = new BehaviorSubject([]);
    this.columnas_error$ = new BehaviorSubject([]);
    this.respuestas$ = new BehaviorSubject([]);
    this.errores$ = new BehaviorSubject([]);    
  }

  ngOnInit() {
    this.service.sincronizacion_detalle().subscribe(rs => {
      console.log(rs);
      this.columnas$.next(['fecha','hora','nombre','emails','fecha_google','hora_google','usuario_id']);
      this.respuestas$.next(rs['respuestas']);
      this.columnas_error$.next(['fecha','hora','error','descripcion','usuario_id']);
      this.errores$.next(rs['errores']);
    });    
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
