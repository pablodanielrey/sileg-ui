import { Component, OnInit, ViewChild } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { NotificacionesService } from '../../notificaciones.service';
import { DatosLugarDesignaciones, Cargo, DatoDesignacion, Designacion } from '../../entities/sileg';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DialogoEliminarDesignacionComponent } from '../dialogo-eliminar-designacion/dialogo-eliminar-designacion.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';

export class DesignacionSource {
  fullname: string;
  dni: string;
  cargo: string;
  fecha: Date;
  id: string;
  modificado: boolean;

  constructor(d: DatoDesignacion) {
    if (d.usuario) {
      if (d.usuario.nombre == null) {
        d.usuario.nombre = '';
      }
      if (d.usuario.apellido == null) {
        d.usuario.apellido = '';
      };
      this.fullname = this.capitalize(d.usuario.nombre.trim()) + ' ' + this.capitalize(d.usuario.apellido.trim());
      this.dni = d.usuario.dni;
    }


    this.cargo = d.designacion.cargo_id;
    this.fecha = d.designacion.desde;
    this.id = d.designacion.id;
    this.modificado = false;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toDesignacion() {
    return new Designacion({'id': this.id, 'desde': this.fecha, 'cargo_id':this.cargo});
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
  eliminarDesignacionDialogRef: MatDialogRef<DialogoEliminarDesignacionComponent>;

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }


  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.dataSource.sort = this.sort;
    this.obtenerTiposCargos();
    this.obtenerDesignacionesLugar(params.get('id'));
  }

  obtenerTiposCargos() {
    this.cargos = [];
    this.subscriptions.push(this.service.cargos()
      .subscribe(r => {
        this.cargos = r;
        this.cargos.sort((c1:Cargo, c2:Cargo) => c1.nombre.localeCompare(c2.nombre));
      }));
  }
  
  ordenar(e:Sort) {
    let orden = e;
    this.element_data.sort(
      (a:DesignacionSource, b:DesignacionSource) : number => {
        
        let e1 = a;
        let e2 = b;
        if (orden.direction == 'desc') {
          e1 = b;
          e2 = a;
        }

        switch (orden.active) {
          case 'fullname': {
            return e1.fullname.localeCompare(e2.fullname);
          }
          case 'dni': {
            return e1.dni.localeCompare(e2.dni);
          }
          case 'cargo': {
            return e1.cargo.localeCompare(e2.cargo);
          }
          case 'fecha': {
            return e1.fecha.getTime() - e2.fecha.getTime();
          }
        }
        return 0;
    });
    this.dataSource.data = this.element_data;
  }

  obtenerDesignacionesLugar(id:string) {
    this.datos = new DatosLugarDesignaciones({});
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerDesignacionesLugares(id)
      .subscribe(r => {
        this.element_data = r.designaciones.map(d => new DesignacionSource(d));
        this.dataSource.data = this.element_data;
        this.datos = r;
        this.cargando = false;
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
    this.eliminarDesignacionDialogRef = this.dialog.open(DialogoEliminarDesignacionComponent, {data: {'lugar':this.datos.lugar.nombre, 'fullname':d.fullname}});
    this.eliminarDesignacionDialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.cargando = true;
        this.subscriptions.push(this.service.eliminarDesignacion(d.id)
          .subscribe(r => {
            this.notificaciones.show("El usuario ha sido removido del lugar");
            this.element_data.splice(this.element_data.indexOf(d),1);
            this.dataSource.data = this.element_data;
            this.cargando = false;
          }));
      }
    });
  }

  guardar(d: DesignacionSource) {
    this.cargando = true;
    this.subscriptions.push(this.service.modificarDesignacion(d.toDesignacion())
      .subscribe(r => {
        this.cargando = false;
        d.modificado = false;
        this.notificaciones.show("Se ha modificado correctamente");
      }));
  }


}
