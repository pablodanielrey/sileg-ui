import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavegarService } from '../../../../../core/navegar.service';

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

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  submit() {
    let v = this.form.value;
  }

  alta() {
    let lid = 'sdfsdfsdfdf';
    let pid = 'ssdfsdfsd';
    this.navegar.navegar({
      url:'/sistema/movimientos/alta/alta-cargo/' + lid + '/' + pid,
      params:{}
    }).subscribe();
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

}
