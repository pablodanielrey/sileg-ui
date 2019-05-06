import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavegarService } from '../../../core/navegar.service';
import { ErrorService } from '../../../core/error/error.service';
import { deepStrictEqual } from 'assert';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  columnas: string[] = ['cargo','dedicacion','caracter','desde','hasta','resolucion','expediente','estado'];
  lugares$: Observable<any[]>;
  usuario$: Observable<any>;

  constructor(private error_service: ErrorService,
              private service : SilegService, 
              private navegar: NavegarService) { }

  ngOnInit() {
    let lid = "1f7b87ea-96b7-428c-8a00-fd33e1ba3ee6";
 
    this.lugares$ = this.service.desginacionesPendientes([lid]).pipe(
      map( v => {
        let a = [];
        for(let e of v) {
          a.push({
            lugar: e.lugar,
            ptos_alta: e.ptos_alta,
            ptos_baja: e.ptos_baja,
            designaciones$: of(e.designaciones)
          })
        }
        return a
      }),
      tap(v => console.log(v))
    )

    this.usuario$ = of({nombre:'Walter Roberto', apellido:'Blanco', dni:'27294557', id:'asddsfsdfdsfsd'});
  }

  volver() {
    let s = this.navegar.volver().subscribe(_ => {
      s.unsubscribe();
    });
  }  

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': 'designacion creada con éxito'});
  }    

}
