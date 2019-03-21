import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../shared/services/sileg.service';
import { NotificacionesService } from '../../shared/services/notificaciones.service';
import { Lugar } from '../../shared/entities/sileg';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { DialogoEliminarLugarComponent } from '../dialogo-eliminar-lugar/dialogo-eliminar-lugar.component';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-detalle-lugar',
  templateUrl: './detalle-lugar.component.html',
  styleUrls: ['./detalle-lugar.component.css']
})
export class DetalleLugarComponent implements OnInit {

  tipos = [
    {nombre: 'Oficina', value: 'oficina'},
    {nombre: 'Cátedra', value: 'catedra'},
    {nombre: 'Lugar Dictado', value: 'lugar dictado'},
    {nombre: 'Centro', value: 'centro'},
    {nombre: 'Comisión', value: 'comision'},
    {nombre: 'Departamento', value: 'departamento'},
    {nombre: 'Dirección', value: 'direccion'},
    {nombre: 'Escuela', value: 'escuela'},
    {nombre: 'Externo', value: 'externo'},
    {nombre: 'Facultad', value: 'facultad'},
    {nombre: 'Instituto', value: 'instituto'},
    {nombre: 'Maestría', value: 'maestria'},
    {nombre: 'Prosecretaría', value: 'prosecretaria'},
    {nombre: 'Secretaría', value: 'secretaria'},
    {nombre: 'Seminario', value: 'seminario'},
    {nombre: 'Universidad', value: 'universidad'}
  ]
  lugar: Lugar = new Lugar({});
  subscriptions: any[] = [];
  modulos: string[] = [];

  eliminarLugarDialogRef: MatDialogRef<DialogoEliminarLugarComponent>;

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.obtenerLugar(params.get('id'));
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
    }));
  }

  obtenerLugar(id: string) {
    if (id == null) {
      this.volver();
    } else {
      this.subscriptions.push(this.service.buscarLugar(id)
        .subscribe(r => {
          console.log(r);
          this.lugar = r;
        }));
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  guardar() {
    this.subscriptions.push(this.service.modificarLugar(this.lugar)
      .subscribe(r => {
        this.notificaciones.show("El lugar ha sido modificado correctamente");
        this.volver();
      }));
  }

  eliminarLugar() {
      this.eliminarLugarDialogRef = this.dialog.open(DialogoEliminarLugarComponent, {data: this.lugar});
      this.eliminarLugarDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.subscriptions.push(this.service.eliminarLugar(this.lugar.id)
            .subscribe(r => {
              this.lugar.eliminado = new Date(r);
              this.notificaciones.show("El lugar ha sido eliminado");
              this.volver();
            }));
        }
      });
  }

  restaurarLugar() {
    this.subscriptions.push(this.service.restaurarLugar(this.lugar.id)
      .subscribe(r => {
        this.notificaciones.show("El lugar ha sido restaurado exitosamente");
        this.volver();
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
