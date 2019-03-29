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

  toggle_preload() {
    //this.preload.obtener_preload_completo().next(false);
    this.preload.obtener_preload_parcial().next(true);
  }

  toggle_preload2() {
    //this.preload.obtener_preload_completo().next(false);
    this.preload.obtener_preload_parcial().next(false);
  }  

}
