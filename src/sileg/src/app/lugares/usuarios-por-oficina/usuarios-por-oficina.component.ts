import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { NotificacionesService } from '../../notificaciones.service';
import { DatosLugarDesignaciones, Cargo } from '../../entities/sileg';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog, MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-usuarios-por-oficina',
  templateUrl: './usuarios-por-oficina.component.html',
  styleUrls: ['./usuarios-por-oficina.component.css']
})
export class UsuariosPorOficinaComponent implements OnInit {

  datos: DatosLugarDesignaciones;
  cargos: Cargo[] = [];
  columnas: string[] = ['nombre','dni','cargo','fecha','acciones'];
  subscriptions: any[] = [];
  cargando: boolean;

  constructor(private service: SilegService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }


  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.obtenerDesignacionesLugar(params.get('id'));
    this.obtenerTiposCargos();
  }

  obtenerTiposCargos() {
    this.cargos = [];
    this.subscriptions.push(this.service.cargos()
      .subscribe(r => {
        console.log(r);
        this.cargos = r;
      }));
  }

  obtenerDesignacionesLugar(id:string) {
    this.datos = new DatosLugarDesignaciones({});
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerDesignacionesLugares(id)
      .subscribe(r => {
        this.cargando = false;
        console.log(r);
        this.datos = r;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  eliminarDesignacion(id: string) {

  }



  cargoCambiado(event:any) {
    console.log('cambiaaaaaadooooo');
  }

}
