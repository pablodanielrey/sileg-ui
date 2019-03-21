import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material'
import  { CreateConfirmacionComponent } from './create-confirmacion.component';

import { SilegService } from '../../shared/services/sileg.service'

import { Usuario, Telefono } from '../../shared/entities/usuario';

export interface Generos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  usuario: Usuario = null;
  mensaje: string = null;
  telefono_fijo: Telefono = null;
  telefono_movil: Telefono = null;

  minDate: Date = new Date(1900, 0, 1);
  maxDate: Date = new Date();

  generos: Generos[] = [
    {value: 'm', viewValue: 'Masculino'},
    {value: 'f', viewValue: 'Femenino'},
    {value: 'o', viewValue: 'Otro'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private service: SilegService,
              public dialog: MatDialog) { }


  ngOnInit() {
    this.usuario = new Usuario({});
    this.mensaje = null;
    this.telefono_fijo = new Telefono({});
    this.telefono_movil = new Telefono({});
  }

  _agregarTelefonos(): void {
    this.usuario.telefonos = new Array<Telefono>();
    if (this.telefono_fijo.numero.length > 0){
      this.telefono_fijo.tipo = 'fijo';
      this.usuario.telefonos.push(this.telefono_fijo);
    }
    if (this.telefono_movil.numero.length > 0){
      this.telefono_movil.tipo = 'movil';
      this.usuario.telefonos.push(this.telefono_movil);
    }
  }

  verificarCrearPersona(): void {
    let dialogRef = this.dialog.open(CreateConfirmacionComponent, {
        width: '250px'
    });
    dialogRef.afterClosed().subscribe(r => { r == 1 ? this.crearPersona() : this.cancelar() });
  }

  cancelar():void {
    this.mensaje = null;
  }

  crearPersona(): void {
    this.mensaje = null;
    this._agregarTelefonos();
    this.service.crearUsuario(this.usuario).subscribe(res => {
      console.log(res);
      this.mensaje = 'id: ' + res;
      this.usuario = new Usuario({});
    })
  }
}
