import { Component, OnInit, HostBinding } from '@angular/core';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { Configuracion } from '../../shared/entities/sileg';
import { SilegService } from '../../shared/services/sileg.service';

import { PreloadService } from '../preload/preload.service';

import { OverlayContainer} from '@angular/cdk/overlay';
import { EventsService } from '../events.service';
import { RouterService } from '../router.service';
import { PermisosService } from '../permisos.service';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, mergeMap, combineAll, combineLatest,  tap } from 'rxjs/operators';



declare type MenuItemResuelto = {
  item: MenuItem,
  mostrar: boolean
}

declare type MenuItem = {
  item: string,
  menu: MenuSistema,
  ruta: string,
  permisos: string[],
  icono: string
}

declare type MenuSistema = MenuItem[];

const menu : MenuSistema = [
  { item: 'Lugares', menu: null, ruta: '/sistema/lugares/seleccionar', icono: 'filter_1', permisos: ['urn:sileg:lugares:read'] },
  { item: 'Pendientes', menu: null, ruta: '/sistema/movimientos/pendientes', icono: 'notifications_none', permisos: [] }
];


@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  
  menu_sistema: Observable<MenuItemResuelto[]> = null;
  identity = null;

  subscriptions: any[] = [];
  config: Configuracion = null;
  @HostBinding('class') componentCssClass;

  constructor(public overlayContainer: OverlayContainer,
              private oauthService: Oauth2Service, 
              private service: SilegService,
              private preload: PreloadService,
              private events: EventsService,
              private router: Router,
              private routerEvents: RouterService,
              private permisos: PermisosService) { 

    let menu_temp: Observable<[Observable<MenuItemResuelto>]> = of(menu).pipe(
        tap(v => {console.log(1), console.log(v)}),
        map(items => items.map(i => this.resolver_permisos(i))),
        tap(v => {console.log(2), console.log(v)}),
        combineLatest()
    )
    let menu_temp2: Observable<Observable<MenuItemResuelto[]>> = menu_temp.pipe(
      tap(v => {console.log(3), console.log(v)}),
      combineLatest()
    )

    this.menu_sistema = menu_temp2.pipe(
      tap(v => {console.log(4), console.log(v)}),
      mergeMap(items => items),
      tap(v => {console.log(5), console.log(v)})
    );
      
  }

  resolver_permisos(o:MenuItem) : Observable<MenuItemResuelto> {
    return this.tengo_permisos(o).pipe(
      map(b => {
        return {
          item: o,
          mostrar: b
        }
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.events.obtener_cola().subscribe(e => {
        console.log(e);
      })
    )
    this.subscriptions.push(this.routerEvents.subscribir());
    this.identity = this.oauthService.getIdentity();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }


  navegar(item:MenuItem) {

  }

  tengo_permisos(item:MenuItem):Observable<boolean> {
    return of(true);
  }


  cerrar_menu(d) {
    d.toggle();
    console.log('cerrar_menu');
  } 

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  salir() {
    this.oauthService.logout().subscribe(() => {
      this.router.navigate(['/loader']);
    });
  }

}
