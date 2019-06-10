import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { switchMap, map, filter, tap, distinct } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NavegarService } from '../../../core/navegar.service';
import { DatoDesignacion, Lugar } from '../../../shared/entities/sileg';
import { Usuario } from '../../../shared/entities/usuario';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  animations:[
    trigger('desplegarDetalle', [
      state('abierto', style({
        height: '*',
      })),
      state('cerrado', style({
        height: '0px',
        minHeight: '0'
      })),
      transition('abierto <=> cerrado', [
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class DetalleComponent implements OnInit {

  columnasDesktop: string[] = ['usuario','cargo', 'dedicacion', 'caracter', 'tipo', 'fecha', 'fechaF', 'resolucion', 'expediente', 'expedienteU', 'estado'];
  columnasCelular : string[] = ['usuarioCelular', 'cargo', 'estado'];
  lugares$: Observable<any[]>;
  usuario$: Observable<Usuario>;
  lugar$: BehaviorSubject<Lugar> = new BehaviorSubject(null);
  designaciones$: Observable<Array<DatoDesignacion>>;

  constructor(
    private service : SilegService,
    private route: ActivatedRoute, 
    private cdRef: ChangeDetectorRef,
    private navegar: NavegarService
  ) { }

              
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

  textoEstado(estado) {
    if (estado.final && estado.tipo == 'Baja') {
      return "Baja";
    }
    if (estado.final) {
      return "Activa";
    }
    return estado.tipo;
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

  estado_tipo(desig) {
    return desig.estado.tipo;
  }

  clase_estado_tipo(desig) {
    return this.estado_tipo(desig);
  }

  estado_estado(desig) {
    return desig.estado.estado.substr(0,1);
  }

  clase_estado_estado(desig) {
    return this.estado_estado(desig);
  }

  

  columnas() {
    /*
      detecta si es un dispositivo touch
    */
    if (typeof window.ontouchstart !== 'undefined') {
      return this.columnasCelular;
    } else {
      return this.columnasDesktop;
    }
  }

}
