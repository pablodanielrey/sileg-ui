import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavegarService } from '../../../core/navegar.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas: string[] = ['usuario','puntos','acciones'];
  lugares$: Observable<any[]>;

  constructor(private service : SilegService, private navegar: NavegarService) { }

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


  modificar(did) {

  }

  dar_de_baja(did) {
    this.navegar.navegar({
      url: '/sistema/movimientos/baja/crear/did',
      params: {did:did}
    }).subscribe()
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

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

}
