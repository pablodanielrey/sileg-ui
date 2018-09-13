import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.oidp_issuer,
  redirectUri: window.location.origin,
  logoutUrl: environment.logoutUrl,
  oidc: true,
  requireHttps: false,
  clientId: 'sileg-ui',
  dummyClientSecret: 'sileg-ui',
  scope: 'openid profile email',
  showDebugInformation: true
}

import { OAuthService } from 'angular-oauth2-oidc';
import { NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';

interface Profile {
  username: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private oauthService: OAuthService, private router: Router, private route:ActivatedRoute) {
    this.configureWithNewConfigApi();
  }

  public menu_abierto: boolean = false;

  onMenu(abierto: boolean):void {
    this.menu_abierto = !this.menu_abierto;
  }

  onOpenedChange(abierto: boolean): void {
    this.menu_abierto = abierto;
  }

  onItem(v:boolean):void {
    this.menu_abierto = v;
  }

  /*
  private tryLogin() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocument().then(() => {
       this.oauthService.tryLogin();
       if (this.oauthService.getAccessToken() == null) {
         this.oauthService.initImplicitFlow();
       }
     });
  }
  */

  private configureWithNewConfigApi() {
    console.log('configurando oauth2');
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.events.subscribe(e => {
        console.debug('oauth/oidc event', e);
    })
    console.log('tratando de loguearme');
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.getAccessToken() == null) {
        this.router.navigate(['/loader']);
      } else {
        this.router.navigate(['/sistema/inicial']);
      }
    });
  }

  salir():void {
    this.oauthService.logOut();
    //window.location.href = this.oauthService.logoutUrl;
    //window.location.reload();
  }
}
