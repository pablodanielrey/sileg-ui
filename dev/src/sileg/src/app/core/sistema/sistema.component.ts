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
import { Observable, of, Subject, forkJoin, observable } from 'rxjs';
import { map, mergeMap, combineAll, combineLatest,  tap, flatMap, mergeAll } from 'rxjs/operators';
import { NavegarService } from '../navegar.service';

import { MenuItem } from './types';
import { menu } from '../../modules/menu';

declare type MenuItemResuelto = {
  item: MenuItem,
  mostrar: boolean
}


@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  
  menu_sistema$: Observable<MenuItemResuelto[]> = null;
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
              private permisos: PermisosService,
              private navegar: NavegarService) { 

    let menu$ = of(menu);
    this.menu_sistema$ = menu$.pipe(
      map(rs => rs.map(e => 
        this.tengo_permisos(e).pipe(
          map(b => {
            return {
              item: e,
              mostrar: b
            }
          })
        )
      )),
      mergeMap(a => forkJoin(a))
    )
      
  }

  tiene_submenu(menu:MenuItemResuelto):boolean {
    return (menu.item.menu != null && menu.item.menu.length > 0);
  }

  submenu(menu:MenuItem): Observable<MenuItemResuelto[]> {
    return of(menu.menu).pipe(
      map(rs => rs.map(e => 
        this.tengo_permisos(e).pipe(
          map(b => {
            return {
              item: e,
              mostrar: b
            }
          })
        )
      )),
      mergeMap(a => forkJoin(a))
    )
  }

  tengo_permisos(item:MenuItem):Observable<boolean> {
    return of(true);
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


  navegar_hacia(item:MenuItem) {
    console.log(item);
    let s = this.navegar.navegar({
      url: item.ruta,
      params: []
    }).subscribe(_ => {
      s.unsubscribe();
    })
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
