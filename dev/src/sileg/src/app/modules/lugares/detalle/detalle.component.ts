import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {


  form = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    tipo: new FormControl(''),
    oficina: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl('')
  });

  constructor() { 
  }
 

  ngOnInit() {
  }

}
