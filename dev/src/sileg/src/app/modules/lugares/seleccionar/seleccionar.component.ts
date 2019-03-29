import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.scss']
})
export class SeleccionarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  seleccionado(l) {
    console.log(l);
  }

}
