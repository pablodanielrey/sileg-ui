import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SilegService } from '../sileg.service';
import { Lugar, PedidoDesignacion } from '../entities/sileg';
import { Usuario } from '../entities/usuario';


@Component({
  selector: 'app-generar-designacion',
  templateUrl: './generar-designacion.component.html',
  styleUrls: ['./generar-designacion.component.css']
})
export class GenerarDesignacionComponent implements OnInit {

  lugares: Lugar[] = [];
  lugarSeleccionado: Lugar = null;
  usuarioSeleccionado: Usuario = null;
  usuario_id: string = null;
  busqueda: string = '';
  busquedaActivada: boolean = false;
  correo: string = '';
  disponible: boolean = false;
  mensaje: string = null;
  subscriptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: SilegService) { }

  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      usuario => {
        this.usuarioSeleccionado = usuario.usuario;
        //this.correo = usuario.usuario.nombre.toLowerCase().replace(' ','.') + '.' + usuario.usuario.apellido.toLowerCase().replace(' ','') + '@econo.unlp.edu.ar';
        console.log(usuario);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  actualizarBusqueda() : void {
    this.busquedaActivada = (this.busqueda.length > 3);
  }

  buscarLugares(): void {
    this.lugarSeleccionado = null;
    this.lugares = [];
    this.subscriptions.push(this.service.buscarLugares(this.busqueda)
      .subscribe(datos => {
        console.log(datos);
        this.lugares = datos;
      }));
  }

  onSelect(stepper:any, lugar:Lugar): void {
    this.lugarSeleccionado = lugar;
    stepper.next();
  }

  desactivar(): void {
    this.mensaje = null;
    this.disponible = false;
  }

  verificarDisponibilidad(): void {
    this.mensaje = null;
    this.subscriptions.push(this.service.chequearDisponibilidadCorreo(this.correo)
      .subscribe(existe => {
        console.log(existe);
        this.disponible=!existe;
        this.disponible ? this.mensaje='Cuenta Disponible' : this.mensaje='Cuenta No Disponible';
      }));
  }

  generarDesignacion(stepper:any):void {
    let d = new PedidoDesignacion();
    d.lugar_id = this.lugarSeleccionado.id;
    d.usuario_id = this.usuario_id;
    d.correo = this.correo;
    this.subscriptions.push(this.service.generarDesignacion(d)
      .subscribe(
        res => {
          stepper.next();
        },
        err => {
          console.log(err);
        }));
  }

}
