import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService, NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.oidp_issuer,
  redirectUri: window.location.origin + '/oauth2',
  logoutUrl: environment.logoutUrl,
  oidc: true,
  requireHttps: false,
  clientId: 'sileg-ui',
  dummyClientSecret: 'sileg-ui',
  scope: 'openid profile email',
  showDebugInformation: true
}


@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.css']
})
export class Oauth2Component implements OnInit {

  access_token: string = '';
  id_token: string = '';

  constructor(private router: Router, private oauthService: OAuthService) { }

  ngOnInit() {
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
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.getAccessToken() == null || !this.oauthService.hasValidAccessToken()) {
        this.oauthService.initImplicitFlow();
      } else {
        this.access_token = this.oauthService.getAccessToken();
        this.id_token = this.oauthService.getIdToken();
        this.router.navigate(['/']).then(b => {
          console.log(b);
        });
      }
    });
  }

  logout() {
    this.oauthService.logOut(false);
  }

}
