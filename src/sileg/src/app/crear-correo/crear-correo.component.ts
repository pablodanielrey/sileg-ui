import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SilegService } from '../sileg.service';

import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-crear-correo',
  templateUrl: './crear-correo.component.html',
  styleUrls: ['./crear-correo.component.css']
})
export class CrearCorreoComponent implements OnInit {

  usuario_id: string = null;
  usuarioSeleccionado: Usuario = null;
  correo: string = '';
  mensaje: string = '';
  disponible: boolean = false;
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

  desactivar(): void {
    this.mensaje = null;
    this.disponible = false;
  }

  verificarDisponibilidad(): void {
    if (this.correo.indexOf('econo.unlp.edu.ar') == -1) {
      this.mensaje = 'Debe ser cuenta @econo.unlp.edu.ar';
      return;
    }

    this.mensaje = null;
    this.subscriptions.push(this.service.chequearDisponibilidadCorreo(this.correo)
      .subscribe(existe => {
        console.log(existe);
        this.disponible=!existe;
        this.disponible ? this.mensaje='Cuenta Disponible' : this.mensaje='Cuenta No Disponible';
      }));
  }

  generarCorreo(stepper:any):void {
    this.subscriptions.push(this.service.generarCorreo(this.usuario_id, this.correo)
      .subscribe(
        res => {
          console.log(res);
          stepper.next();
        },
        err => {
          console.log(err);
        }));
  }


}
