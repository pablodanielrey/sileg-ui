import { Component, OnInit } from '@angular/core';
import { Lugar, Designacion } from '../../../shared/entities/sileg';
import { MatTableDataSource } from '@angular/material';
import { Usuario } from '../../../shared/entities/usuario';
import { SilegService } from '../../../shared/services/sileg.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

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

class LugarViewDataSource extends DataSource<any> {
  constructor(private service: SilegService) {
    super();
  }
  connect(): Observable<LugarView[]> {
    return this.service.desginacionesPendientes([]);
  }
  disconnect() {}
}


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['ptos_alta'];
  dataSource = new LugarViewDataSource(this.service);
  constructor(private service : SilegService) { }

  ngOnInit() {
    
  }

}
