import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { SilegService } from '../../shared/services/sileg.service'

import { Usuario } from '../../shared/entities/usuario';
import { Sileg } from '../../shared/entities/sileg';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  subscriptions: any[] = [];

  ditesi = ['30001823', '27294557', '31381082', '29694757', '34928857', '34770038', '31073351', '27821597'];
  habilitados = ['8700794','21968942','31433408','94656241'];
  logueado: any;

  buscando:boolean = false;


  constructor(private service: SilegService,
              private router: Router,
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

  buscarUsuarios(event): void {
    this.usuarios = [];
    this.buscando = true;
    this.subscriptions.push(this.service.buscarUsuarios(event)
      .subscribe(usuarios => {
        this.buscando = false;
        this.usuarios = usuarios;
      }));
  }

  seleccionarUsuario(event): void {
    this.router.navigate(['/sistema/usuario/usuario', event.id]);
  }

}
