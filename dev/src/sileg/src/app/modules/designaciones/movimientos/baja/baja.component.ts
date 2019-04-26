import { Component, OnInit } from '@angular/core';
import { PreloadService } from '../../../../core/preload/preload.service';

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.scss']
})
export class BajaComponent implements OnInit {

  constructor(private preload: PreloadService) { }

  ngOnInit() {
    //this.preload.activar_preload_completo();
  }

}
