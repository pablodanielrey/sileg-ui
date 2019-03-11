import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificacionesService } from '../../shared/services/notificaciones.service';
import { Location } from '@angular/common';

import { SilegService } from '../../shared/services/sileg.service';

import { Usuario } from '../../shared/entities/usuario';

@Component({
  selector: 'app-cargar-correo',
  templateUrl: './cargar-correo.component.html',
  styleUrls: ['./cargar-correo.component.css']
})
export class CargarCorreoComponent implements OnInit {
  usuario_id: string = null;
  usuarioSeleccionado: Usuario = null;
  correo: string = '';
  subscriptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private notificaciones: NotificacionesService,
              private service: SilegService) { }

  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      usuario => {
        this.usuarioSeleccionado = usuario;
        //this.correo = usuario.usuario.nombre.toLowerCase().replace(' ','.') + '.' + usuario.usuario.apellido.toLowerCase().replace(' ','') + '@econo.unlp.edu.ar';
        console.log(usuario);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  verificarSintaxis(){
    let patron = new RegExp('(([a-zA-Z-_0-9.]+)[@]([a-zA-Z-_0-9\d.]+)[.]([a-zA-Z]+))')
    if (patron.test(this.correo)){
      this.generarCorreo();
    }else{
      this.notificaciones.show("Error de sintaxis en el correo ingresado, corríjalo e intente nuevamente.");
    }
  }

  generarCorreo():void {
    this.subscriptions.push(this.service.cargarCorreo(this.usuario_id, this.correo)
      .subscribe(
        res => {
          console.log(res);
          this.location.back()
        },
        err => {
          console.log(err);
        }));
  }

}
