import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NavegarService } from '../../../core/navegar.service';
import { ErrorService } from '../../../core/error/error.service';
import { DatoDesignacion, Lugar } from '../../../shared/entities/sileg';
import { Usuario } from '../../../shared/entities/usuario';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  // columnas: string[] = ['cargo','dedicacion','caracter','desde','hasta','resolucion','expediente','estado'];
  columnas: string[] = ['cargo', 'dedicacion', 'caracter', 'tipo', 'fecha', 'resolucion', 'expediente', 'estado'];
  lugares$: Observable<any[]>;
  usuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  lugar$: BehaviorSubject<Lugar> = new BehaviorSubject(null);
  designaciones$: Observable<Array<DatoDesignacion>>;

  constructor(private error_service: ErrorService,
              private service : SilegService,
              private route: ActivatedRoute, 
              private navegar: NavegarService) { }

  ngOnInit() {
    this.designaciones$ = this.route.paramMap.pipe(
      switchMap( params => {
        if (params.has('id')) {
          let id = params.get('id');
          return this.service.detalleDesignacion(id);
        } else {
          return null;
        }
      }),
      tap( list => {
        this.usuario$.next(list[0].usuario);
        this.lugar$.next(list[0].designacion.lugar);
      })
    )
  }

  volver() {
    let s = this.navegar.volver().subscribe(_ => {
      s.unsubscribe();
    });
  }  

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': 'designacion creada con éxito'});
  }    

}
