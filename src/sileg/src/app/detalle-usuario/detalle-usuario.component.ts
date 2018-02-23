import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario, Mail } from '../entities/usuario';
import { DatosSileg, Sileg, Designacion } from '../entities/sileg';
import { SilegService } from '../sileg.service'


@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  usuario_id: string = null;
  datos: DatosSileg = null;
  designaciones: Designacion[] = null;
  eliminados: boolean = false;
  subscriptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: SilegService) { }

  ngOnInit() {
    this.usuario_id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.service.buscarUsuario(this.usuario_id).subscribe(
      datos => {
        this.datos = datos;
        console.log(datos);
      }));
    this.subscriptions.push(this.service.buscarDesignaciones(this.usuario_id).subscribe(
      designaciones => {
        this.designaciones = designaciones;
        console.log(designaciones);
      }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  crearCorreo(): void {

  }

  actualizarDatos(): void {
    this.service.actualizarDatos(this.datos.usuario).subscribe(
      res => {
        console.log(res);
      });
  }

  eliminarCorreo(m:Mail): void {
    this.subscriptions.push(this.service.eliminarCorreo(m.usuario_id, m.id).subscribe(
      res => { location.reload(); },
      err => { console.log(err); }
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
}
