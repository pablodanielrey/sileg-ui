import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Usuario } from '../entities/usuario';
import { DatosSileg } from '../entities/sileg';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Output()
  selected: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @Output('searchEvent')
  search: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  usuarios: Array<DatosSileg> = new Array<DatosSileg>();

  busqueda: string = "";

  constructor() { }

  ngOnInit() {
  }

  seleccionarUsuario(u: Usuario):void {
    this.selected.emit(u);
  }

  buscarUsuarios(): void {
    this.search.emit(this.busqueda);
  }

}
