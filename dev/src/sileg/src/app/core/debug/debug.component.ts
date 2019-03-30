import { Component, OnInit } from '@angular/core';
import { PreloadService } from '../preload/preload.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  constructor(private preload: PreloadService) { }

  ngOnInit() {
  }

  activar_preload_parcial() {
    this.preload.activar_preload_parcial();
  }

  desactivar_preload_parcial() {
    this.preload.desactivar_preload_parcial();
  }  

  activar_preload_completo() {
    this.preload.activar_preload_completo();
  }

  desactivar_preload_completo() {
    this.preload.desactivar_preload_completo();
  }  


}
