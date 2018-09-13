import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario, Mail, Telefono } from '../../entities/usuario';
import { Sileg, Designacion } from '../../entities/sileg';
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

  lugar: string = environment.lugar;
  usuario_id: string = null;
  usuario: Usuario = null;
  designaciones: Designacion[] = null;
  eliminados: boolean = false;
  subscriptions: any[] = [];
  cargando: boolean = false;

  telefono_fijo: Telefono = null;
  telefono_movil: Telefono = null;

  minDate: Date = new Date(1900, 0, 1);
  maxDate: Date = new Date();

  generos: Generos[] = [
    {value: 'm', viewValue: 'Masculino'},
    {value: 'f', viewValue: 'Femenino'},
    {value: 'o', viewValue: 'Otro'}
  ];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private notificaciones: NotificacionesService,
              private service: SilegService) {
  }

  mostrarEliminarTelefono(t:Telefono) {
    if (t.id == null) {
      return false;
    } else {
      return t.eliminado == null;
    }
  }

  /*
    Analizar solución final del tema de datos personales.
  */
  inicializarTelefonos(usuario:Usuario) {
    usuario.telefonos.forEach(t => {
      if (t.eliminado == null) {        
        if (t.tipo == 'fijo'){
          this.telefono_fijo = new Telefono(t);
        }
        if (t.tipo == 'movil'){
          this.telefono_movil = new Telefono(t);
        }
      }
    });
    if (this.telefono_fijo == null) {
      this.telefono_fijo = new Telefono({'tipo': 'fijo', 'usuario_id': usuario.id, 'nuevo': true});
    }
    if (this.telefono_movil == null) {
      this.telefono_movil = new Telefono({'tipo': 'movil', 'usuario_id': usuario.id, 'nuevo': true});
    }

  }

  procesarTelefonosUsuario(usuario:Usuario) {
    let fm = this.telefono_fijo.nuevo;
    let mm = this.telefono_movil.nuevo;
    usuario.telefonos.forEach(t => {
      
      if (!fm && t.tipo == 'fijo' && t.eliminado == null && t.numero != this.telefono_fijo.numero ) {
        fm = true;
      }
      if (!mm && t.tipo == 'movil' && t.eliminado == null && t.numero != this.telefono_movil.numero) {
        mm = true;
      }
    });

    if (fm && this.telefono_fijo.numero.trim() != "") {
      this.telefono_fijo.id = null;
      usuario.telefonos.push(this.telefono_fijo);
    }
    if (mm && this.telefono_movil.numero.trim() != "") {
      this.telefono_movil.id = null;
      usuario.telefonos.push(this.telefono_movil);
    }

  }


  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.cargando = true;
    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      usuario => {
        this.cargando = false;
        this.usuario = usuario;
        /* Correccion de problema de fecha mostrada en datepicker*/
        if (usuario.nacimiento != null){
          let a= new Date(usuario.nacimiento);
          a.setMinutes(a.getMinutes()+a.getTimezoneOffset());
          this.usuario.nacimiento = a;
        }
        /*
          TODO: hack HORRBILE!!!
          como el telefono fijo y movil se mantienen en distintas variables las mapeamos aca:
        */
        this.inicializarTelefonos(usuario);
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
    this.procesarTelefonosUsuario(this.usuario);
    this.service.actualizarDatos(this.usuario).subscribe(
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
    this.usuario.mails.forEach(m => { if (m.email.search('econo.unlp.edu.ar') != -1 && m.confirmado != null && m.eliminado == null) { encontrado = true } })
    return encontrado;
  }

  chequearLugar(c: string): boolean {
    return (this.lugar == c) ? true : false;
  }

}
