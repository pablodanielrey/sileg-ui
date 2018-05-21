import { Component, OnInit, ViewChild } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { NotificacionesService } from '../../notificaciones.service';
import { DatosLugarDesignaciones, Cargo, DatoDesignacion } from '../../entities/sileg';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog, MatDialogRef } from '@angular/material';
import {MatTableDataSource, MatSort} from '@angular/material';

export class DesignacionSource {
  fullname: string;
  dni: string;
  cargo: string;
  fecha: Date;
  id: string;
  modificado: boolean;

  constructor(d: DatoDesignacion) {
    this.fullname = this.capitalize(d.usuario.nombre.trim()) + ' ' + this.capitalize(d.usuario.apellido.trim());
    this.dni = d.usuario.dni;
    this.cargo = d.designacion.cargo_id;
    this.fecha = d.designacion.desde;
    this.id = d.designacion.id;
    this.modificado = false;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

@Component({
  selector: 'app-usuarios-por-oficina',
  templateUrl: './usuarios-por-oficina.component.html',
  styleUrls: ['./usuarios-por-oficina.component.css']
})
export class UsuariosPorOficinaComponent implements OnInit {

  datos: DatosLugarDesignaciones;
  element_data: DesignacionSource[] = [];
  dataSource = new MatTableDataSource(this.element_data);
  cargos: Cargo[] = [];
  columnas: string[] = ['fullname','dni','cargo','fecha','acciones'];
  subscriptions: any[] = [];
  cargando: boolean;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }


  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.dataSource.sort = this.sort;
    this.obtenerDesignacionesLugar(params.get('id'));
    this.obtenerTiposCargos();
  }

  obtenerTiposCargos() {
    this.cargos = [];
    this.subscriptions.push(this.service.cargos()
      .subscribe(r => {
        this.cargos = r;
      }));
  }

  obtenerDesignacionesLugar(id:string) {
    this.datos = new DatosLugarDesignaciones({});
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerDesignacionesLugares(id)
      .subscribe(r => {
        this.cargando = false;
        this.element_data = r.designaciones.map(d => new DesignacionSource(d));
        this.dataSource.data = this.element_data;
        this.datos = r;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  eliminar(d: DesignacionSource) {
    console.log("Eliminado");
  }

  guardar(d: DesignacionSource) {
    console.log("Guardado")
  }


}
