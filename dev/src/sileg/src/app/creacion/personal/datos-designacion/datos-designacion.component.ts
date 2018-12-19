import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-datos-designacion',
  templateUrl: './datos-designacion.component.html',
  styleUrls: ['./datos-designacion.component.css']
})
export class DatosDesignacionComponent implements OnInit {

  form: FormGroup;
  lugarSeleccionado = null;

  constructor() { }

  ngOnInit() {
  }

  seleccionarLugar(lugar) {
    console.log(lugar);
    this.lugarSeleccionado = lugar;
  }

}
