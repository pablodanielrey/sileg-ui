import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss']
})
export class AprobarComponent implements OnInit {

  constructor(private navegar: NavegarService) { }

  ngOnInit() {
    let s = this.navegar.navegar({url: '/sistema/designaciones/listar/listar/asdsaasasd', params: []}).subscribe(_ => {
      s.unsubscribe();
    })
  }

}
