import { Component } from '@angular/core';

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://oidp.econo.unlp.edu.ar',
  redirectUri: window.location.origin,
  //tokenEndpoint: 'https://oidp.econo.unlp.edu.ar/oauth2/auth',
  //userinfoEndpoint: 'https://oidp.econo.unlp.edu.ar/userinfo',
  loginUrl: 'https://oidp.econo.unlp.edu.ar/oauth2/auth',
  clientId: 'sileg-ui',
  dummyClientSecret: 'sileg-ui',
  scope: 'openid profile email',
  showDebugInformation: true
}
import { OAuthService } from 'angular-oauth2-oidc';
import { NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    console.log('configurando oauth2');
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.events.subscribe(e => {
        console.debug('oauth/oidc event', e);
    })
    console.log('tratando de loguearme');
    this.oauthService.tryLogin();
    if (this.oauthService.getAccessToken() == null) {
      console.log('No se obtuvo ningun access token asi que inicio el flujo de auth');
      this.oauthService.initImplicitFlow();
    }
  }
}
