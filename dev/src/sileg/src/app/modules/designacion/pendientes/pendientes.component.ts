import { Component, OnInit } from '@angular/core';
import { Lugar, Designacion } from '../../../shared/entities/sileg';
import { MatTableDataSource } from '@angular/material';
import { Usuario } from '../../../shared/entities/usuario';
import { SilegService } from '../../../shared/services/sileg.service';

class LugarView {
  lugar: Lugar = null;
  ptos_alta: number = 0;
  ptos_baja: number = 0;
  designaciones: MatTableDataSource<DatosDesignacionPtos> = null;
}

class DatosDesignacionPtos {
  designacion: Designacion = null;
  usuario: Usuario = null;
  ptos: number = null;
  estado: Estado = null; 
}

class Estado {
  fecha: Date;
  nombre: string = null;
  authorized: string = null;
}



@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  columnas: string[] = ['fullname'];
  designaciones : LugarView[];
  constructor(private service : SilegService) { }

  ngOnInit() {
    this.service.desginacionesPendientes([]).subscribe(ds => {
      console.log(ds);
    });    
    // this.buscarDesignacionesPendientes();
  }

  // buscarDesignacionesPendientes() {
  //   this.lugares = [
  //     { 'nombre': 'Administración Pública I',
  //       'ptos_alta': 55,
  //       'ptos_baja': 60,
  //       'designaciones': [{
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'Titular',
  //         'dedicacion':'D/S',
  //         'caracter':'Interino',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '20'
  //       },
  //       {
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'',
  //         'dedicacion':'',
  //         'caracter':'',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '15'
  //       },
  //       {
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'',
  //         'dedicacion':'',
  //         'caracter':'',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '15'
  //       }]
  //     },
  //     { 'nombre': 'Actuación Judicial',
  //       'ptos_alta': 55,
  //       'ptos_baja': 60,
  //       'designaciones': [{
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'',
  //         'dedicacion':'',
  //         'caracter':'',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '15'
  //       },
  //       {
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'',
  //         'dedicacion':'',
  //         'caracter':'',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '15'
  //       },
  //       {
  //         'nombre': 'Pedro',
  //         'apellido':'Andreiu',
  //         'fullname': 'Pedro Andreiu',
  //         'cargo':'',
  //         'dedicacion':'',
  //         'caracter':'',
  //         'fecha':new Date(),
  //         'nota': null,
  //         'resol':'',
  //         'expediente':'',
  //         'tipo': 'alta',
  //         'estado': 'pendiente',
  //         'puntos': '15'
  //       }]
  //     }
  //   ];
  //   this.designaciones = this.procesar_para_vista(this.lugares);
  // }

  // procesar_para_vista(lugares: Lugar[]) : LugarView[] {
  //   let r : LugarView[] = [];
  //   lugares.forEach(l => {
  //     let dv = new DesignacionView();
  //     dv.lugar = l;
  //     dv.designaciones = new MatTableDataSource(l.designaciones);
  //     r.push(dv)
  //   });
  //   console.log(r);
  //   return r;
  // }

}
