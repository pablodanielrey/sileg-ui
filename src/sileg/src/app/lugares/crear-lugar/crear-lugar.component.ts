import { Component, OnInit } from '@angular/core';

import { Lugar } from '../../entities/sileg';


@Component({
  selector: 'app-crear-lugar',
  templateUrl: './crear-lugar.component.html',
  styleUrls: ['./crear-lugar.component.css']
})
export class CrearLugarComponent implements OnInit {

  tipos = [
    {id:'', nombre:'Centro', descripcion:''},
    {id:'', nombre:'Deparatmento', descripcion:''},
    {id:'', nombre:'Dirección', descripcion:''},
    {id:'', nombre:'Instituto', descripcion:''},
    {id:'', nombre:'Unidad', descripcion:''},
    {id:'', nombre:'Secretaria', descripcion:''}
  ]
  lugar: Lugar = null;

  constructor() { }

  ngOnInit() {
    this.lugar = new Lugar({});
  }

  crear() {
    console.log("creado");
  }

}
