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
  element_data_historico: DesignacionSource[] = [];
  dataSource = new MatTableDataSource(this.element_data);
  dataSourceHistorico = new MatTableDataSource(this.element_data_historico);
  cargos: Cargo[] = [];
  columnas: string[] = ['fullname','dni','cargo','fecha','acciones'];
  columnasHistoricos: string[] = ['fullname','dni','cargo','fecha'];
  subscriptions: any[] = [];
  cargando: boolean;
  @ViewChild(MatSort) sort: MatSort;
  eliminarDesignacionDialogRef: MatDialogRef<DialogoEliminarDesignacionComponent>;
  modulos: string[] = [];

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }


  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.dataSource.sort = this.sort;
    this.dataSourceHistorico.sort = this.sort;
    this.obtenerTiposCargos();
    this.obtenerDesignacionesLugar(params.get('id'));
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
    }));
  }

  obtenerTiposCargos() {
    this.cargos = [];
    this.subscriptions.push(this.service.cargos()
      .subscribe(r => {
        this.cargos = r;
        this.cargos.sort((c1:Cargo, c2:Cargo) => c1.nombre.localeCompare(c2.nombre));
      }));
  }
  
  obtenerDesignacionesLugar(id:string) {
    this.datos = new DatosLugarDesignaciones({});
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerDesignacionesLugares(id)
      .subscribe(r => {
        r.designaciones.forEach(s => {
          let temp = new DesignacionSource(s);
          if (s.designacion.historico == null){
            this.element_data.push(temp);
          }else{
            this.element_data_historico.push(temp);
          }
        })
        this.dataSource.data = this.element_data;
        this.dataSourceHistorico.data = this.element_data_historico;
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

  chequearPerfil(profiles: string[]): boolean {
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        r = true;
      }
    });
    return r
  }


}
