import { Component, OnInit } from '@angular/core';

import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  usuario: Usuario = null;

  constructor() { }

  ngOnInit() {
    this.usuario = new Usuario({});
  }

  crearPersona(): void {
    
  }

}
