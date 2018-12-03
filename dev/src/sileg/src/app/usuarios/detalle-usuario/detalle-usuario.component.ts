import { Component, OnInit, Input, SimpleChange } from '@angular/core';
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
  designaciones: number = 0;
  eliminados: boolean = false;
  subscriptions: any[] = [];
  cargando: boolean = false;
  modulos: string[] = [];

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
    return (t.numero.length > 0)
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

  procesarTelefonosUsuario(usuario:Usuario): void{
    if ((this.telefono_fijo.nuevo) && (this.telefono_fijo.numero.length > 0)){
      this.usuario.telefonos.push(this.telefono_fijo);
    }
    if ((this.telefono_movil.nuevo) && (this.telefono_movil.numero.length > 0)){
      this.usuario.telefonos.push(this.telefono_movil);
    }
  }

  buscarUsuario(id:string) {
    this.cargando = true;
    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      usuario => {
        this.cargando = false;
        this.usuario = usuario;
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
  }

  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.buscarUsuario(this.usuario_id);
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
    }));
    this.buscarDesignaciones(this.usuario_id);
  }

  buscarDesignaciones(uid: string) {
    this.subscriptions.push(this.service.buscarDesignaciones(uid).subscribe(ds => {
      console.log(ds);
      this.designaciones = ds.length;
    }));    
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
      res => { this.cargando = false; this.notificaciones.show('Los datos han sidos guardados correctamente'); this.buscarUsuario(this.usuario_id); },
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

  marcarTelEliminado(tid: string): void{
    this.usuario.telefonos.forEach(t => {
      if (t.id == tid){
        t.eliminado = new Date();
      }
    })
  }  

  _eliminarTelefono(t:Telefono): void {
    if (t.id){
      this.marcarTelEliminado(t.id);
    }
  }

  eliminarTelefono(t:Telefono): void {
    this._eliminarTelefono(t);
    if (t.tipo == 'fijo'){
      this.telefono_fijo = new Telefono({'tipo': t.tipo, 'usuario_id': this.usuario.id, 'nuevo': true});
    }
    if (t.tipo == 'movil'){
      this.telefono_movil = new Telefono({'tipo': t.tipo, 'usuario_id': this.usuario.id, 'nuevo': true});
    }
  }

  modificarTelefono(t:Telefono, change:SimpleChange){
    this._eliminarTelefono(t);
    if (t.tipo == 'fijo'){
      this.telefono_fijo = new Telefono({'tipo': t.tipo, 'usuario_id': this.usuario.id, 'nuevo': true, 'numero' : change});
    }
    if (t.tipo == 'movil'){
      this.telefono_movil = new Telefono({'tipo': t.tipo, 'usuario_id': this.usuario.id, 'nuevo': true, 'numero' : change});
    }    
  }

  tieneDesignacion(): boolean {
    return this.designaciones > 0;
  }

  tieneCorreoInstitucional(): boolean {
    let encontrado: boolean = false;
    this.usuario.mails.forEach(m => { if (m.email.search('econo.unlp.edu.ar') != -1 && m.confirmado != null && m.eliminado == null) { encontrado = true } })
    return encontrado;
  }

  chequearLugar(c: string): boolean {
    return (this.lugar == c) ? true : false;
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
