import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SilegService } from '../sileg.service';
import { Lugar } from '../entities/sileg';


@Component({
  selector: 'app-generar-designacion',
  templateUrl: './generar-designacion.component.html',
  styleUrls: ['./generar-designacion.component.css']
})
export class GenerarDesignacionComponent implements OnInit {

  lugares: Lugar[] = [];
  lugarSeleccionado: Lugar = null;
  busqueda: string = '';
  busquedaActivada: boolean = false;
  correo: string = '';
  disponible: boolean = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: SilegService) { }

  ngOnInit() {
  }

  actualizarBusqueda() : void {
    this.busquedaActivada = (this.busqueda.length > 3);
  }

  buscarLugares(): void {
    this.lugarSeleccionado = null;
    this.lugares = [];
    this.service.buscarLugares(this.busqueda)
      .subscribe(datos => {
        console.log(datos);
        this.lugares = datos;
      });
  }

  desactivar(): void {
    this.disponible = false;
  }

  verificarDisponibilidad(): void {
    this.disponible = true;
  }

  onSelect(stepper:any, lugar:Lugar): void {
    this.lugarSeleccionado = lugar;
    stepper.next();
  }

}
