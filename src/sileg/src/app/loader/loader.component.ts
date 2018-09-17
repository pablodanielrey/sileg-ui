import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderHeader: string;
  loaderLogo: string;
  loaderFooter1: string;
  loaderFooter2: string;
  loaderBackground: string;

  constructor(private oauthService: OAuthService) {
    this.loaderHeader= environment.loaderHeader;
    this.loaderLogo= environment.loaderLogo;
    this.loaderFooter1= environment.loaderFooter1;
    this.loaderFooter2= environment.loaderFooter2;
    let fondo= environment.loaderBackground;
    this.loaderBackground= 'url('+ fondo +')';
  }

  ngOnInit() {
  }

  acceder() {
    console.log('iniciando implicit flow');
    this.oauthService.initImplicitFlow();
  }

}
