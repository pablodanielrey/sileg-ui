import { Component, OnInit } from '@angular/core';
import { Usuario } from '../entities/usuario';


@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor() { }

  ngOnInit() {
  }

}
