import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form: FormGroup = null;

  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      cargo: [''],
      dedicacion: [''],
      caracter: ['']
    });
  }

  ngOnInit() {
  }

}
