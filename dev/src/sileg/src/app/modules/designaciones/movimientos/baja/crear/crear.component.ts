import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { NavegarService } from '../../../../../core/navegar.service';
import { PreloadService } from '../../../../../core/preload/preload.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  constructor(private navegar: NavegarService, private preload: PreloadService) { }

  ngOnInit() {
    this.preload.activar_preload_completo();
    let s = interval(2000).pipe(
      switchMap(v => this.navegar.volver()),
      tap(v => this.preload.desactivar_preload_completo()))
    .subscribe((v) => {
      console.log(v);
      s.unsubscribe();
    });
  }

}
