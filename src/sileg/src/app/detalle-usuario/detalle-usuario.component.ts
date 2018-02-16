import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { DatosSileg, Sileg } from '../entities/sileg';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() datos: DatosSileg;

  constructor() { }

  ngOnInit() {
  }

  crearClaveTemporal(): void {

  }

  crearCorreo(): void {

  }

  crearDesignacion(): void {

  }


  tieneDesignacion(): boolean {
    return this.datos.sileg != null;
  }

  tieneCorreoInstitucional(): boolean {
    let encontrado: boolean = false;
    this.datos.usuario.mails.forEach(m => { if (m.email.search('econo.unlp.edu.ar') != -1) { encontrado = true } })
    return encontrado;
  }
}
