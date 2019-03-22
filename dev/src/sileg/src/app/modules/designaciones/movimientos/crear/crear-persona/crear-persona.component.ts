import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
    let v = this.form.value;
  }

}
