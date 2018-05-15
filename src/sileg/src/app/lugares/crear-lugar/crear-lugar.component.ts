import { Component, OnInit } from '@angular/core';

import { SilegService } from '../../sileg.service';
import { Lugar } from '../../entities/sileg';


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
  
  constructor(private service: SilegService) { }

  ngOnInit() {
    this.lugar = new Lugar({});
  }

  crear() {
    this.subscriptions.push(this.service.crearLugar(this.lugar)
      .subscribe(datos => {
        console.log(datos);
      }));
  }

}
