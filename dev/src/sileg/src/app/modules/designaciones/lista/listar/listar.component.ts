import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { SilegService } from '../../../../shared/services/sileg.service';
import { map, tap, switchMap, filter, mergeMap } from 'rxjs/operators';
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
import { PerfilesService, Perfil } from '../../../../shared/services/perfiles.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  columnasDesktop : string[] = ['usuario', 'cargo', 'dedicacion', 'caracter', 'fecha', 'nota', 'resolucion', 'expediente', 'expedienteU', 'estado', 'acciones'];
  columnasCelular : string[] = ['usuarioCelular', 'estado', 'acciones'];
  lugares$: Observable<any[]>;
  referencias_visibles: boolean = false;
  lid: string;
  filtros: any = {};
  
  // tipos de perfiles. para exportarlo a la vista.
  perfil = Perfil;

  puntos_header$: Observable<string> = null;
  perfiles$ : Observable<Perfil[]> = null;

  constructor(private error_service: ErrorService,
              private service: SilegService,
              private navegar: NavegarService,
              private route: ActivatedRoute,
              private preload: PreloadService,
              public dialog: MatDialog,
              private perfiles: PerfilesService,
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

    // obtengo todos los perfiles y si estan activos o no.
    let obs_perfiles$: Observable<{perfil:Perfil, es:boolean}[]> = this.perfiles.perfiles().pipe(
      mergeMap(perfiles => {
        let arr = perfiles.map(perfil => {
            let resultado = this.perfiles.es(perfil).pipe(
              map(b => { 
                let o = { perfil:perfil, es:b }
                return o 
              })
            ) 
            return resultado;
          });
        return combineLatest(arr);
      }
    ))
    // filtro los perfiles que estan presentes
    this.perfiles$ = obs_perfiles$.pipe(
      map(ps => ps.filter(p => p.es)),
      map(ps => ps.map(p => p.perfil)),
      tap(v => console.log(v))
    )

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

  puntos(lugar):Observable<string> {
    return this.perfiles$.pipe(
      map(ps => {
        if (ps.includes(Perfil.AUTORIDAD)) {
          return " - Puntos alta: " + lugar.ptos_alta + " - Puntos Baja: " + lugar.ptos_baja;
        } else {
          return "";
        }
      }))
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
    let navegar_modificar = this.navegar.navegar({
      url: '/sistema/movimientos/editar/' + desig.id,
      params: { }
    });

    let s = this.navegar.obtenerRuta().pipe(
      tap(ruta_actual => {
        sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
      }),
      switchMap(v => navegar_modificar)
    ).subscribe( v => s.unsubscribe())

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
        if (!('filtrar' in value)) {
          return of(null)
        }
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
      url: '/sistema/movimientos/alta/seleccionar-persona/'+lid,
       params: {}
     });

     let s = this.navegar.obtenerRuta().pipe(
      tap(ruta_actual => {
        sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
      }),
      switchMap(v => navegar_alta)
    ).subscribe( v => s.unsubscribe())
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
