import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SilegService } from '../../../../shared/services/sileg.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NavegarService } from '../../../../core/navegar.service';
import { ErrorService } from '../../../../core/error/error.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas: string[] = ['usuario', 'cargo', 'dedicacion', 'caracter', 'fecha', 'nota', 'resolucion', 'expediente', 'estado', 'acciones'];
  lugares$: Observable<any[]>;
  referencias_visibles: boolean = false;

  constructor(private error_service: ErrorService,
    private service: SilegService,
    private navegar: NavegarService,
    private router: Router) { }

  ngOnInit() {
    let lid = "1f7b87ea-96b7-428c-8a00-fd33e1ba3ee6";

    this.lugares$ = this.service.desginacionesPendientes([lid]).pipe(
      map(v => {
        let a = [];
        for (let e of v) {
          a.push({
            lugar: e.lugar,
            ptos_alta: e.ptos_alta,
            ptos_baja: e.ptos_baja,
            designaciones$: of(e.designaciones)
          })
        }
        return a
      }),
      tap(v => console.log(v))
    )


    /*
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.mostrar_dialogo = false;
      }
    })
    */
  }

  estado_tipo(desig) {
    let t = ['A','B','C','P']
    let i = Math.floor(Math.random() * (t.length))
    //return desig.estado.nombre.substr(0,1);
    return t[i];    
    //return desig.estado.nombre.substr(0,1);
  }

  estado_estado(desig) {
    let t = ['P','A','U']
    let i = Math.floor(Math.random() * (t.length))
    //return desig.estado.nombre.substr(0,1);
    return t[i];
  }

  adjuntar_resolucion(mid) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/asdsadasd/adjuntar-resolucion',
      params: { mid: mid }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  modificar(mid) {
    let s = this.navegar.navegar({
      url: '/sistema/movimientos/editar/:mid',
      params: { mid: mid }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  aprobar(did) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/asdsadasd/aprobar',
      params: { did: did }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  denegar(did) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/asdsadasd/denegar',
      params: { did: did }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  cancelar(did) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/asdsadasd/cancelar',
      params: { did: did }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }


  detalle(did) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/detalle/' + did,
      params: { did: did }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  dar_de_baja(mid) {
    let s = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/asdsadasd/baja',
      params: { did: mid }
    }).subscribe(_ => {
      s.unsubscribe();
    })
  }

  crear_alta(lid) {
    let navegar_alta = this.navegar.navegar({
      url: '/sistema/movimientos/alta/seleccionar-persona/sdfdsfsd',
      params: {}
    })

    this.navegar.obtenerRuta().pipe(
      tap(ruta_actual => {
        sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
      }),
      switchMap(v => navegar_alta)
    ).subscribe()
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
