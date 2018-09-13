import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { SilegService } from '../../sileg.service'

import { Usuario } from '../../entities/usuario';
import { Sileg } from '../../entities/sileg';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  busqueda:string = "";
  busquedaActivada: boolean = false;
  subscriptions: any[] = [];

  ditesi = ['30001823', '27294557', '31381082', '29694757', '34928857', '34770038', '31073351', '27821597'];
  habilitados = ['8700794','21968942','31433408','94656241'];
  logueado: any;

  buscando:boolean = false;


  constructor(private service: SilegService,
              private oauthService: OAuthService) {
  }

  ngOnInit() {
    // this.oauthService.loadUserProfile().then(r => { this.logueado = r; });
  }

  salir():void {
    this.oauthService.logOut(true);
    window.location.href = this.oauthService.logoutUrl;
    //window.location.reload();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  actualizarBusqueda() : void {
    this.busquedaActivada = (this.busqueda.length > 3);
  }

  buscarUsuarios(): void {
    this.usuarios = [];
    this.buscando = true;
    this.subscriptions.push(this.service.buscarUsuarios(this.busqueda)
      .subscribe(usuarios => {
        this.buscando = false;
        this.usuarios = usuarios;
      }));
  }

}
