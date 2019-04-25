import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegarService } from '../../../core/navegar.service';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.scss']
})
export class SeleccionarComponent implements OnInit {

  constructor(private router: Router, private navegar: NavegarService) { }

  ngOnInit() {
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

  seleccionado(l) {
    this.navegar.navegar({
      url: '/sistema/lugares/detalle/sdsdffsd',
      params: {}
    }).subscribe().unsubscribe();
  }

}
