import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NavegarService } from '../../../core/navegar.service';

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

  constructor(private navegar: NavegarService) { 
  }
 

  ngOnInit() {
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

  designaciones() {
    this.navegar.navegar({
      url: '/sistema/designaciones/listar/sdfsdfd',
      params: {}
    }).subscribe().unsubscribe();
  }

}
