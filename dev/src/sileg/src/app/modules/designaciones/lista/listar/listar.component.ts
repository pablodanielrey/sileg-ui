import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription, forkJoin } from 'rxjs';
import { SilegService } from '../../../../shared/services/sileg.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { NavegarService } from '../../../../core/navegar.service';
import { ErrorService } from '../../../../core/error/error.service';
import { Designacion } from '../../../../shared/entities/sileg';
import { DenegarComponent } from '../../movimientos/denegar/denegar.component';
import { MatDialog } from '@angular/material';
import { AprobarComponent } from '../../movimientos/aprobar/aprobar.component';
import { CancelarComponent } from '../../movimientos/cancelar/cancelar.component';
import { BajaComponent } from '../../movimientos/baja/baja.component';
import { EnviarUnlpComponent } from '../../movimientos/enviar-unlp/enviar-unlp.component';
import { VerificarPrestacionComponent } from '../../movimientos/verificar-prestacion/verificar-prestacion.component';
import { DescargarArchivosComponent } from '../../movimientos/descargar-archivos/descargar-archivos.component';
import { FiltrosComponent } from '../filtros/filtros.component';
import { PreloadService } from '../../../../core/preload/preload.service';
import { state, style, transition, animate, trigger } from '@angular/animations';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
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
export class ListarComponent implements OnInit {
  columnasDesktop : string[] = ['usuarioCelular', 'usuario', 'cargo', 'dedicacion', 'caracter', 'puntos', 'fecha', 'nota', 'resolucion', 'expediente', 'expedienteU', 'estado', 'acciones'];
  columnasCelular : string[] = ['usuarioCelular', 'estado', 'acciones'];
  lugares$: Observable<any[]>;
  referencias_visibles: boolean = false;
  lid: string;
  filtros: any = {};
  expandedElement: any | null;


  constructor(private error_service: ErrorService,
              private service: SilegService,
              private navegar: NavegarService,
              private route: ActivatedRoute,
              private preload: PreloadService,
              public dialog: MatDialog,
              private router: Router) { 

    }

  ngOnInit() {
    let params = Observable.combineLatest(
      this.route.paramMap,
      this.route.queryParamMap,
      (params: any, queryParams: any) => {
        this.filtros = {
          "lid": params.has('mid') ? params.get('mid') : null,
          "actuales": queryParams.has('actuales') ? JSON.parse(queryParams.get('actuales')): true,
          "pendientes": queryParams.has('pendientes') ? JSON.parse(queryParams.get('pendientes')): true
        }
        return this.filtros
      })


    this.lugares$ = params.pipe(
      tap( _ => this.preload.activar_preload_parcial()),
      switchMap(p => {     
        console.log(p);      
        if (p.lid) {
          this.lid = p.lid;
          return this.service.obtenerDesignaciones([this.lid], p.pendientes, p.actuales);
        } else {
          return [];
        }
      }),
      map(v => {
        let a = [];
        for (let e of v) {
          a.push({
            lugar: e.lugar,
            ptos_alta: e.puntos_alta,
            ptos_baja: e.puntos_baja,
            designaciones$: of(e.designaciones)
          })
        }
        return a
      }),
      tap( _ => this.preload.desactivar_preload_parcial())
    );
  }

  columnas() {
    if (typeof window.ontouchstart !== 'undefined') {
      return this.columnasCelular;
    } else {
      return this.columnasDesktop;
    }
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

  adjuntar_resolucion(desig: Designacion) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/'+desig.lugar_id+'/adjuntar-resolucion',
      params: { mid: desig.id }
    }).subscribe(_ => {
      s.unsubscribe();
    });
  }

  modificar(desig: Designacion) {
    let s = this.navegar.navegar({
      url: '/sistema/movimientos/editar/' + desig.id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    });
  }

  aprobar(desig: Designacion) {
    const dialogRef = this.dialog.open(AprobarComponent, {
      width: '250px',
      data: desig.id
    });
  }

  denegar(desig: Designacion) {
    const dialogRef = this.dialog.open(DenegarComponent, {
      width: '250px',
      data: desig.id
    });
  }

  cancelar(desig: Designacion) {
    const dialogRef = this.dialog.open(CancelarComponent, {
      width: '250px',
      data: desig.id
    });
  }


  detalle(desig:Designacion) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/detalle/' + desig.id,
      params: { }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  dar_de_baja(desig: Designacion) {
    const dialogRef = this.dialog.open(BajaComponent, {
      width: '250px',
      data: desig.id
    });
  }

  enviar_unlp(desig: Designacion) {
    const dialogRef = this.dialog.open(EnviarUnlpComponent, {
      width: '250px',
      data: desig.id
    });    
  }

  descargar_archivos(desig: Designacion) {
    const dialogRef = this.dialog.open(DescargarArchivosComponent, {
      width: '250px',
      data: desig.id
    });      
  }

  filtrar() {
    const dialogRef = this.dialog.open(FiltrosComponent, {
      width: '250px',
      data: this.filtros
    });
    let call = dialogRef.afterClosed().pipe( 
      switchMap( value => {
        return this.navegar.navegar({
          url: '/sistema/designaciones/listar/listar/'+ this.filtros.lid,
           params: value
         })              
      })
    ).subscribe( c => call.unsubscribe() )

  }  

  verificar_prestacion(desig: Designacion) {
    const dialogRef = this.dialog.open(VerificarPrestacionComponent, {
      width: '250px',
      data: desig.id
    });
  }


  crear_alta(lid) {
    let navegar_alta = this.navegar.navegar({
      url: '/sistema/movimientos/alta/seleccionar-persona/sdfdsfsd',
       params: {}
     }).subscribe(() => {
       navegar_alta.unsubscribe();
     })

  //   this.subscriptions.push(this.navegar.obtenerRuta().pipe(
  //     tap(ruta_actual => {
  //       sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
  //     }),
  //     switchMap(v => navegar_alta)
  //   ).subscribe());
  }

  volver() {
    let s = this.navegar.volver().subscribe(_ => {
      s.unsubscribe();
    });
  }

  mostrar_error() {
    this.error_service.error({ 'error': true, 'mensaje': 'designacion creada con éxito' });
  }

}
