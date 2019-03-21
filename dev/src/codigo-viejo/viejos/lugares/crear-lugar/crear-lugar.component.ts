import { Component, OnInit } from '@angular/core';

import { SilegService } from '../../shared/services/sileg.service';
import { NotificacionesService } from '../../shared/services/notificaciones.service';
import { Lugar } from '../../shared/entities/sileg';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-lugar',
  templateUrl: './crear-lugar.component.html',
  styleUrls: ['./crear-lugar.component.css']
})
export class CrearLugarComponent implements OnInit {

  tipos = [
    {nombre: 'Oficina', value: 'oficina'}
  ]

  lugar: Lugar = null;
  subscriptions: any[] = [];
  cargando:boolean = false;

  constructor(private service: SilegService,
              private router: Router,
              private notificaciones: NotificacionesService) { }

  ngOnInit() {
    this.lugar = new Lugar({});
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  crear() {
    this.cargando = true;
    this.subscriptions.push(this.service.crearLugar(this.lugar)
      .subscribe(datos => {
        this.cargando = false;
        this.notificaciones.show("El lugar  " + this.lugar.nombre + " ha sido creado exitosamente");
        this.router.navigate(['/sistema/lugares/crear']);
      }, error => {
        this.cargando = false;
        console.log("Error al crear componente");

      }
    ));
  }

}
