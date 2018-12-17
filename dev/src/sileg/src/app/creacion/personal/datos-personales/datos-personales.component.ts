import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {


  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      nombre: [{value:''}],
      apellido: [{value:''}],
      dni: [{value:''}]
    });
  }

  ngOnInit() {
    this.form.get('nombre').setValue('nombre');
    this.form.get('apellido').setValue('apellido');
    this.form.get('dni').setValue('dni');
  }

}
