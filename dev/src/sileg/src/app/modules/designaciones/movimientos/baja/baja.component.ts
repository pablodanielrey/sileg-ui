import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.scss']
})
export class BajaComponent implements OnInit {

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
  }

  confirmar() {
    let s = this.navegar.navegar({url: '/sistema/designaciones/listar/listar/asdsaasasd', params: []}).subscribe(_ => {
      s.unsubscribe();
    })
  }
}
