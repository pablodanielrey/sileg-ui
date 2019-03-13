import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  lugares: any[] = [];
  constructor() { }

  ngOnInit() {
    this.buscarDesignacionesPendientes();
  }

  buscarDesignacionesPendientes() {
    this.lugares = [
      { 'nombre': 'Administración Pública I',
        'ptos_alta': 55,
        'ptos_baja': 60,
        'designaciones': [{
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'Titular',
          'dedicacion':'D/S',
          'caracter':'Interino',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '20'
        },
        {
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'',
          'dedicacion':'',
          'caracter':'',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '15'
        },
        {
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'',
          'dedicacion':'',
          'caracter':'',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '15'
        }]
      },
      { 'nombre': 'Actuación Judicial',
        'ptos_alta': 55,
        'ptos_baja': 60,
        'designaciones': [{
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'',
          'dedicacion':'',
          'caracter':'',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '15'
        },
        {
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'',
          'dedicacion':'',
          'caracter':'',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '15'
        },
        {
          'nombre': 'Pedro',
          'apellido':'Andreiu',
          'cargo':'',
          'dedicacion':'',
          'caracter':'',
          'fecha':new Date(),
          'nota': null,
          'resol':'',
          'expediente':'',
          'tipo': 'alta',
          'estado': 'pendiente',
          'puntos': '15'
        }]
      }
    ];
  }

}
