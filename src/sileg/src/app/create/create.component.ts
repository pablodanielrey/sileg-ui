import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SilegService } from '../sileg.service'

import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  usuario: Usuario = null;
  mensaje: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private service: SilegService) { }


  ngOnInit() {
    this.usuario = new Usuario({});
  }

  crearPersona(): void {
    this.mensaje = null;
    console.log(this.usuario);
    this.service.crearUsuario(this.usuario).subscribe(res => {
      console.log(res);
      this.mensaje = 'id: ' + res;
      this.usuario = new Usuario({});
      this.router.navigate(['/crear']);
    },
    err => {
      console.log(err);
      this.mensaje = 'Error creando el usuario';
    });
  }

}
