import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
