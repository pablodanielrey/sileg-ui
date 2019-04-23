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


@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  
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
