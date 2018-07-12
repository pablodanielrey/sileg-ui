import { Component, OnInit } from '@angular/core';

import { SilegService } from '../../sileg.service'
import { Usuario } from '../../entities/usuario';
import { DatosSileg, Sileg, PedidoDesignacion } from '../../entities/sileg';
import { NotificacionesService } from '../../notificaciones.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-quitar-usuarios',
  templateUrl: './agregar-quitar-usuarios.component.html',
  styleUrls: ['./agregar-quitar-usuarios.component.css']
})
export class AgregarQuitarUsuariosComponent implements OnInit {

  usuarios: Array<DatosSileg> = new Array<DatosSileg>();
  subscriptions: any[] = [];
  id: string = "";
  cargando: boolean = false;

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.id = params.get('id');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  seleccionarUsuario(event) {
    console.log(event);
    let pedido = new PedidoDesignacion();
    pedido.lugar_id = this.id;
    pedido.usuario_id = event.id;
    this.subscriptions.push(this.service.generarDesignacionSinCorreo(pedido)
      .subscribe(d => {
        this.notificaciones.show("El usuario " + event.nombre + " " + event.apellido + " ha sido agregado correctamemte");
        this.volver();
      }));
  }

  volver() {
    this.location.back();
  }

  buscar(event): void {
    this.usuarios = [];
    this.cargando = true;
    this.subscriptions.push(this.service.buscarUsuarios(event)
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        this.cargando = false;
      }));
  }

}
