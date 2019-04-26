import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { interval, timer } from 'rxjs';
import { NavegarService } from '../../../../../core/navegar.service';
import { PreloadService } from '../../../../../core/preload/preload.service';
import { ErrorService } from '../../../../../core/error/error.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  constructor(private navegar: NavegarService, 
              private preload: PreloadService,
              private error_service: ErrorService) { }

  ngOnInit() {
    /*
    this.preload.activar_preload_completo();
    let s = interval(2000).pipe(
      switchMap(v => this.navegar.volver()),
      tap(v => this.preload.desactivar_preload_completo()))
    .subscribe((v) => {
      console.log(v);
      s.unsubscribe();
    });
    */
    let s = timer(2000).pipe(
      tap(_ => { this.mostrar_error() }),
      switchMap(_ => this.navegar.navegar({
          url:'/sistema/designaciones/listar/:id',
          params:{}
      }))).subscribe(_ => {
          s.unsubscribe();
      });
  }

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': 'baja exitosa'});
  }    

}
