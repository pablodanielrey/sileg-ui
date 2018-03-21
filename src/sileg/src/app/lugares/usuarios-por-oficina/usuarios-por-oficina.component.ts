import { Component, OnInit } from '@angular/core';


export interface Usuario {
  nombre: string;
  apellido: string;
  dni: string;
  cargo: string;
  fecha: Date;
}

export interface Cargo {
  nombre: string;
  id: string;
}


@Component({
  selector: 'app-usuarios-por-oficina',
  templateUrl: './usuarios-por-oficina.component.html',
  styleUrls: ['./usuarios-por-oficina.component.css']
})
export class UsuariosPorOficinaComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargos: Cargo[] = [];
  columnas: string[] = ['nombre','apellido','dni','cargo','fecha'];

  constructor() { }

  ngOnInit() {
    this.usuarios = [
      { nombre:'Walter', apellido:'Blanco', dni:'2726345', cargo:'1', fecha:new Date() },
      { nombre:'Walter', apellido:'Blanco', dni:'2726345', cargo:'8', fecha:new Date() },
      { nombre:'Walter', apellido:'Blanco', dni:'2726345', cargo:'7', fecha:new Date() },
      { nombre:'Walter', apellido:'Blanco', dni:'2726345', cargo:'8', fecha:new Date() }
    ];
    this.cargos = [
      { id: '1', nombre:'Cumple Función' },
      { id: '2', nombre:'E7' },
      { id: '3', nombre:'E6' },
      { id: '4', nombre:'E5' },
      { id: '5', nombre:'E4' },
      { id: '6', nombre:'A2' },
      { id: '7', nombre:'Contrato' },
      { id: '8', nombre:'Beca' }
    ];
  }

  cargoCambiado(event:any) {
    console.log('cambiaaaaaadooooo');
  }

}
