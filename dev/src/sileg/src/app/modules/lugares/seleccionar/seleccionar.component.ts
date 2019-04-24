import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.scss']
})
export class SeleccionarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  seleccionado(l) {
    this.router.navigate(['/sistema/lugares/detalle/sdsdffsd']);
  }

}
