import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { switchMap, map, filter, tap, distinct } from 'rxjs/operators';
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
      map(ds => {
        let arr = ds.map(d => d.designacion.lugar);
        return arr.filter((item, pos) => pos == arr.findIndex(obj => { return item.id == obj.id} ) )
      }),
      map(ls => ls.map(l => {
        return {
          lugar:l, 
          designaciones$: this.obtenerDesignaciones(l.id)
        }
      }))
    );

    
  }


  obtenerDesignaciones(lid): Observable<Array<DatoDesignacion>> {
    return of(lid).pipe(
      tap(v => console.log("Lugar " + v + "  <>  " + lid)),
      switchMap( llid => this.designaciones$.pipe(
        tap( v => console.log(v)),
          map(ds => ds.filter(d => {
            return d.designacion.lugar.id == llid
          })),
          tap( _ => console.log(_))
        )
      )
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
