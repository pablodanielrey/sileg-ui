import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor() { }

  ngOnInit() {
  }

}
