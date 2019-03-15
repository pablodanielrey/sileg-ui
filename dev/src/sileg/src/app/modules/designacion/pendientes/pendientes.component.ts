import { Component, OnInit } from '@angular/core';
import { Lugar, Designacion } from '../../../shared/entities/sileg';
import { MatTableDataSource } from '@angular/material';
import { Usuario } from '../../../shared/entities/usuario';
import { SilegService } from '../../../shared/services/sileg.service';
import { Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { map, tap, concatMap, mergeAll, flatMap, switchMap, mapTo } from 'rxjs/operators';

class LugarView {
  lugar: Lugar = null;
  ptos_alta: number = 0;
  ptos_baja: number = 0;
  designaciones: any[];
}

class DatosDesignacionPtos {
  designacion: Designacion = null;
  usuario: Usuario = null;
  ptos: number = null;
  estado: Estado = null; 
}

class Estado {
  fecha: Date;
  nombre: string = null;
  authorized: string = null;
}

class Resultado {
  id: Observable<string>;
  detalle: Observable<Lugar>;

  constructor(id:Observable<string>, valor:Observable<Lugar>) {
    this.id = id;
    this.detalle = valor;
  }

}

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['ptos_alta'];
  designaciones$: Observable<Array<any>>;
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
    this.v$ = this.service.obtenerSublugares(lid).pipe(
        switchMap(ids => this.service.desginacionesPendientes(ids))
      );



    // this.designaciones$ = this.obtenerDesignacionesPendientes();
    // this.dataSource = this.designaciones$;
  }

  obtenerLugar(lid: string): Observable<Lugar> {
    return this.service.buscarLugar(lid);
  }

  obtenerDesignacionesPendientes(ids: string[]): Observable<Array<any>> {
    return this.service.desginacionesPendientes(ids);
  }

}
