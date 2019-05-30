import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../../../shared/services/sileg.service';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, tap, delay } from 'rxjs/operators';
import { NavegarService } from '../../../../core/navegar.service';


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['usuario','cargo','dedicacion','caracter','fecha','nota','resolucion','expediente','estado','acciones'];
  lugares$: Observable<any[]>;

  constructor(private service : SilegService, private navegar: NavegarService) {  }

  ngOnInit() { 
    /*
      obtengo el lugar raiz de todo el arbol para fce y llamo a la lista de designaciones para ese lugar.
    */
    let lid_raiz = '9f09b08d-607a-4192-bc54-5cc5db16ad39'
    let ruta = {
      url: '/sistema/designaciones/listar/listar/' + lid_raiz,
      params: {}
    }
    let s = timer(1000).pipe(
      switchMap(_ => this.navegar.navegar(ruta))
    ).subscribe(_ => {
      s.unsubscribe();
    })
    /*
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
      */
  }

  obtenerDesignacionesPendientes(ids: string[]): Observable<Array<any>> {
    return this.service.designacionesPendientes(ids);
  }

  dar_de_alta(lid) {

    let navegar_alta = this.navegar.navegar({
      url: '/sistema/movimientos/crear/seleccionar/lid',
      params: {}
    })    

    this.navegar.obtenerRuta().pipe(
      tap(ruta_actual => {
        sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
      }),
      switchMap(v => navegar_alta)
    ).subscribe()
  }  

 }
