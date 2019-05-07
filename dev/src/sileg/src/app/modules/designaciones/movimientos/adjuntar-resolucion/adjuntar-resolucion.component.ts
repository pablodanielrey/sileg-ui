import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';

@Component({
  selector: 'app-adjuntar-resolucion',
  templateUrl: './adjuntar-resolucion.component.html',
  styleUrls: ['./adjuntar-resolucion.component.scss']
})
export class AdjuntarResolucionComponent implements OnInit {

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  adjuntar() {
    let s = this.navegar.navegar({url: '/sistema/designaciones/listar/listar/asdsaasasd', params: []}).subscribe(_ => {
      s.unsubscribe();
    })
  }

}
