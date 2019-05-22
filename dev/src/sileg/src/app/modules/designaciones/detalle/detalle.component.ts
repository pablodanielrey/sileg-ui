import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { switchMap, map, filter, tap } from 'rxjs/operators';
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
  lugares$: Observable<Lugar[]>;
  usuario$: Observable<Usuario>;
  lugar$: BehaviorSubject<Lugar> = new BehaviorSubject(null);
  designaciones$: Observable<Array<DatoDesignacion>>;

  constructor(private error_service: ErrorService,
              private service : SilegService,
              private route: ActivatedRoute, 
              private cdRef: ChangeDetectorRef,
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
      })
    )

    this.lugares$ = this.designaciones$.pipe(
      map(ds => 
        ds.reduce((acc, d) => acc.concat([d.designacion.lugar]), [])
      ),
      tap ( _ => console.log(_))
    );


  }


  obtenerDesignaciones(lid): Observable<Array<DatoDesignacion>> {
    return this.designaciones$.pipe(
      map(ds => ds.filter(d => {
        return d.designacion.lugar.id == lid
      }))
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
