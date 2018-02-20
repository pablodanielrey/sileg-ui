import { Component, OnInit } from '@angular/core';

import { SilegService } from '../sileg.service'

import { Usuario } from '../entities/usuario';
import { DatosSileg, Sileg } from '../entities/sileg';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent implements OnInit {

  usuarios: DatosSileg[] = [];
  busqueda:string = "";
  busquedaActivada: boolean = false;
  subscriptions: any[] = [];

  constructor(private service: SilegService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  actualizarBusqueda() : void {
    this.busquedaActivada = (this.busqueda.length > 3);
  }

  buscarUsuarios(): void {
    this.usuarios = [];
    this.subscriptions.push(this.service.buscarUsuarios(this.busqueda)
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
      }));
  }

}
