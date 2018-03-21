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
  columnas: string[] = ['nombre','dni','cargo','fecha','acciones'];

  constructor() { }

  ngOnInit() {
    this.usuarios = [
      { nombre:'Walter', apellido:'Blanco', dni:'30001823', cargo:'2', fecha:new Date() },
      { nombre:'Iván', apellido:'Castañeda', dni:'32025738', cargo:'2', fecha:new Date() },
      { nombre:'Leonardo', apellido:'Consolini', dni:'35625874', cargo:'8', fecha:new Date() },
      { nombre:'Miguel', apellido:'Macagno', dni:'35663981', cargo:'8', fecha:new Date() },
      { nombre:'Emanuel', apellido:'Pais', dni:'31257522', cargo:'5', fecha:new Date() },
      { nombre:'Pablo Daniel', apellido:'Rey', dni:'27589548', cargo:'6', fecha:new Date() },
      { nombre:'Maximiliano', apellido:'Saucedo', dni:'32568741', cargo:'7', fecha:new Date() },
      { nombre:'Alejandro', apellido:'Oporto', dni:'29658319', cargo:'3', fecha:new Date() }



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
