import { Component, OnInit } from '@angular/core';
import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  busqueda:String = "";
  usuarioSeleccionado: Usuario;

  constructor() {
  }

  ngOnInit() {
    let u = new Usuario(); u.nombre = "Nombre1"; u.apellido = "Apellido1";
    this.usuarios.push(u);
    u = new Usuario(); u.nombre = "Nombre2"; u.apellido = "Apellido2";
    this.usuarios.push(u);
  }

  onSelect(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
  }

}
