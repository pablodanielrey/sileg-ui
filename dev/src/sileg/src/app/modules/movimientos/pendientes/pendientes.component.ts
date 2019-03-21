import { Component, OnInit } from '@angular/core';
import { Lugar, Designacion } from '../../../shared/entities/sileg';
import { MatTableDataSource } from '@angular/material';
import { Usuario } from '../../../shared/entities/usuario';
import { SilegService } from '../../../shared/services/sileg.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['usuario','puntos'];
  dataSource: Observable<Array<any>>;
  lugares$: Observable<string[]>;
  lugares_ids$: Observable<Array<string>>;
  lugares_data = {};
  v$: Observable<any[]>;

  constructor(private service : SilegService) {  }

  ngOnInit() { 
    // esto lo tengo que obtener como parametro o por otro método
    let lid = "1f7b87ea-96b7-428c-8a00-fd33e1ba3ee6";
    // obtengo sublugares
    // this.v$ = this.service.obtenerSublugares(lid).pipe(
    //     switchMap(ids => this.service.desginacionesPendientes(ids))
    // );

  this.v$ = this.service.desginacionesPendientes([lid]).pipe(
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

    // this.designaciones$ = this.obtenerDesignacionesPendientes();
    // this.dataSource = this.designaciones$;
  }

  obtenerLugar(lid: string): Observable<Lugar> {
    return this.service.buscarLugar(lid);
  }

  obtenerDesignacionesPendientes(ids: string[]): Observable<Array<any>> {
    return this.service.desginacionesPendientes(ids);
  }

  // servicio$ = of([
  //   {
  //     id: 'sddsdfds',
  //     pendientes: [1,2,3,4,5],
  //     puntos:{},
  //   },
  //   {
  //     id: 's',
  //     pendientes: [2,3,4,5,6],
  //     puntos:{},
  //   },
  //   {
  //     id: 'asdasd',
  //     pendientes: [4,2,4,5],
  //     puntos:{},
  //   }
  // ]); 
  
  // detalle$ = this.servicio$.pipe(
  //   map( v => {
  //     let a = [];
  //     for(let e of v) {
  //       a.push({
  //         id: e.id,
  //         pendientes: of(e.pendientes),
  //         puntos: e.puntos
  //       })
  //     }
  //     return a
  //   })
  // )
}
