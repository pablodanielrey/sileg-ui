import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material'
import  { CreateConfirmacionComponent } from './create-confirmacion.component';

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
              private service: SilegService,
              public dialog: MatDialog) { }


  ngOnInit() {
    this.usuario = new Usuario({});
    this.mensaje = null;
  }

  verificarCrearPersona(): void {
    let dialogRef = this.dialog.open(CreateConfirmacionComponent, {
        width: '250px'
    });
    dialogRef.afterClosed().subscribe(r => { r == 1 ? this.crearPersona() : this.volver() });
  }

  volver():void {
    this.mensaje = null;
  }

  crearPersona(): void {
    this.mensaje = 'Prueba';
    return;
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
