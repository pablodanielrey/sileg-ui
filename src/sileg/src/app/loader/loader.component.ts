import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
  }

  acceder() {
    this.oauthService.initImplicitFlow();
  }

}
