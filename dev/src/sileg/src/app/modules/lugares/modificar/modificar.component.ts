import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modificar-lugar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    tipo: new FormControl(''),
    oficina: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl('')
  });

  tipos$: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }
  
  submit() {

  }

}
