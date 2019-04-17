import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../../../shared/services/sileg.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['usuario','cargo','dedicacion','caracter','fecha','nota','resolucion','expediente','estado','acciones'];
  lugares$: Observable<any[]>;

  constructor(private service : SilegService) {  }

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

  }

  obtenerDesignacionesPendientes(ids: string[]): Observable<Array<any>> {
    return this.service.desginacionesPendientes(ids);
  }

 }
