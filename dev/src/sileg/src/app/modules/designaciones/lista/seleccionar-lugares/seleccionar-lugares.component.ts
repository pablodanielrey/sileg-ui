import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar-lugares',
  templateUrl: './seleccionar-lugares.component.html',
  styleUrls: ['./seleccionar-lugares.component.scss']
})
export class SeleccionarLugaresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lugares_seleccionados(lugares) {
    console.log(lugares);
  }

}
