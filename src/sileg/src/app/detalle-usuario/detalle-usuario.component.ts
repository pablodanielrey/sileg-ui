import { Component, OnInit, Input } from '@angular/core';
import { Usuario, Mail } from '../entities/usuario';
import { DatosSileg, Sileg } from '../entities/sileg';
import { SilegService } from '../sileg.service'


@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() datos: DatosSileg;
  dataClave = {};

  constructor(private service: SilegService) { }

  ngOnInit() {
  }

  crearClaveTemporal(): void {
    let uid = this.datos.sileg.id;
    this.service.generarClave(uid)
      .subscribe(data => this.dataClave = {
          uid: data['uid'],
          clave: data['clave']
        }
    );
  }

  crearCorreo(): void {

  }

  eliminarCorreo(m:Mail): void {

  }

  crearDesignacion(): void {

  }


  tieneDesignacion(): boolean {
    return this.datos.sileg != null;
  }

  tieneCorreoInstitucional(): boolean {
    let encontrado: boolean = false;
    this.datos.usuario.mails.forEach(m => { if (m.email.search('econo.unlp.edu.ar') != -1 && m.confirmado != null && m.eliminado == null) { encontrado = true } })
    return encontrado;
  }
}
