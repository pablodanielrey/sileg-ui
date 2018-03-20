import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('menu_abierto') menu_abierto: boolean;
  //@Output() openedChange = new EventEmitter<boolean>();
  @Output() onItem = new EventEmitter<boolean>();

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
  }

  onInternalItem():void {
    this.onItem.emit(false);
  }

  onOpenedChange(event: boolean):void {
    this.onItem.emit(event);
  }

}
