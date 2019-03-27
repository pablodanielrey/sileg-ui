import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OAuthService } from 'angular-oauth2-oidc';

import { SilegService } from '../../sileg.service';

import { Configuracion } from '../../entities/sileg';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('menu_abierto') menu_abierto: boolean;
  //@Output() openedChange = new EventEmitter<boolean>();
  @Output() onItem = new EventEmitter<boolean>();

  modulos: string[] = [];
  subscriptions: any[] = [];
  config: Configuracion = null;

  constructor(private oauthService: OAuthService, private service: SilegService) { }

  ngOnInit() {
    this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
      this.config = r;
    }));    

    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos=> {
      this.modulos = modulos;
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  onInternalItem():void {
    this.onItem.emit(false);
  }

  onOpenedChange(event: boolean):void {
    this.onItem.emit(event);
  }

  chequearPerfil(profiles: string[]): boolean {
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)){
        r = true;
      }
    });
    return r;
  }

  mostrarOrganigrama():boolean{
    return this.config.mostrar_organigrama;
  }

  mostrarSincoUsuarios():boolean{
    return this.config.mostrar_sincronizacion_usuarios;
  }

  mostrarSincoLogin():boolean{
    return this.config.mostrar_sincronizacion_login;
  }

}
