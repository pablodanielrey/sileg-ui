import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { Configuracion } from '../../shared/entities/sileg';
import { SilegService } from '../../shared/services/sileg.service';

import { PreloadService } from '../preload/preload.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  
  modulos: string[] = [];
  subscriptions: any[] = [];
  config: Configuracion = null;

  constructor(private oauthService: Oauth2Service, 
              private service: SilegService,
              private preload: PreloadService) { 
              
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  cerrar_menu(d) {
    d.toggle();
    console.log('cerrar_menu');
  } 

}
