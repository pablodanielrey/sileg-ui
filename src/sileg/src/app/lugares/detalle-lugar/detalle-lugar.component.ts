import { Component, OnInit } from '@angular/core';

export interface Tipo {
  nombre: string;
  id: string;
}


@Component({
  selector: 'app-detalle-lugar',
  templateUrl: './detalle-lugar.component.html',
  styleUrls: ['./detalle-lugar.component.css']
})
export class DetalleLugarComponent implements OnInit {

  tipos: Tipo[] = [];

  constructor() { }

  ngOnInit() {
  }

}
