import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

interface Profile {
  username: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private route:ActivatedRoute) {
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

}
