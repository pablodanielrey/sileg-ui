import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario, Mail, Telefono } from '../../entities/usuario';
import { DatosSileg, Sileg, Designacion } from '../../entities/sileg';
import { SilegService } from '../../sileg.service';
import { NotificacionesService } from '../../notificaciones.service';

import { environment } from '../../../environments/environment';

export interface Generos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  lugar: string;
  usuario_id: string = null;
  datos: DatosSileg = null;
  designaciones: Designacion[] = null;
  eliminados: boolean = false;
  subscriptions: any[] = [];
  cargando: boolean = false;

  telefono_fijo: Telefono = null;
  telefono_movil: Telefono = null;

  generos: Generos[] = [
    /*{value: '',  viewValue: 'Seleccione...'},*/
    {value: 'm', viewValue: 'Masculino'},
    {value: 'f', viewValue: 'Femenino'},
    {value: 'o', viewValue: 'Otro'}
  ];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private notificaciones: NotificacionesService,
              private service: SilegService) {
              this.lugar = environment.lugar;
              this.telefono_fijo = new Telefono; this.telefono_fijo.eliminado= 'eliminado'; this.telefono_fijo.numero = '';
              this.telefono_movil = new Telefono; this.telefono_movil.eliminado = 'eliminado'; this.telefono_movil.numero = ''; 
  }

  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.cargando = true;

    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      datos => {
        this.cargando = false;
        this.datos = datos;
        console.log(this.datos);
        /*
          TODO: hack HORRBILE!!!
          como el telefono fijo y movil se mantienen en distintas variables las mapeamos aca:
        */
        datos.usuario.telefonos.forEach(t => {
          if (t.eliminado == null){
            if (t.tipo == 'fijo'){
              this.telefono_fijo = t;
            }
            if (t.tipo == 'movil'){
              this.telefono_movil = t;
            }
          }
        });
      },
      err => {
        this.cargando = false;
        this.notificaciones.show(err.message)
      }
    ));

    this.subscriptions.push(this.service.buscarDesignaciones(this.usuario_id).subscribe(
      designaciones => {
        this.designaciones = designaciones.filter(designacion => !designacion.historico);
      },
      err => {
        this.notificaciones.show(err.message)
      }
    ));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  crearCorreo(): void {

  }

  actualizarDatos(): void {
    this.cargando = true;
    this.service.actualizarDatos(this.datos.usuario).subscribe(
      res => { this.cargando = false; this.notificaciones.show('Los datos han sidos guardados correctamente'); },
      err => { this.cargando = false; this.notificaciones.show(err.message); }
    );
  }

  eliminarCorreo(m:Mail): void {
    this.cargando = true;
    this.subscriptions.push(this.service.eliminarCorreo(m.usuario_id, m.id).subscribe(
      res => { this.cargando = false; location.reload(); },
      err => { this.cargando = false; this.notificaciones.show(err.message) }
    ));
  }

  eliminarTelefono(t:Telefono): void {
    this.cargando = true;
    this.subscriptions.push(this.service.eliminarTelefono(t.usuario_id, t.id).subscribe(
      res => { this.cargando = false; location.reload(); },
      err => { this.cargando = false; this.notificaciones.show(err.message) }
    ));
  }

  tieneDesignacion(): boolean {
    return this.designaciones != null && this.designaciones.length > 0;
  }

  tieneCorreoInstitucional(): boolean {
    let encontrado: boolean = false;
    this.datos.usuario.mails.forEach(m => { if (m.email.search('econo.unlp.edu.ar') != -1 && m.confirmado != null && m.eliminado == null) { encontrado = true } })
    return encontrado;
  }

  chequearLugar(c: string): boolean {
    return (this.lugar == c) ? true : false;
  }

}
