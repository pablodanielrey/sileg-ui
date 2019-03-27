import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  cabecera: string;
  version: string;
  tituloSistema: string;
  subtituloSistema: string;
  desarrolloSistema: string;
  logoSistema: string

  constructor() {
    this.cabecera = environment.loader.cabecera;
    this.version = environment.loader.version;
    this.tituloSistema = environment.loader.tituloSistema;
    this.subtituloSistema = environment.loader.subtituloSistema;
    this.desarrolloSistema = environment.loader.desarrolloSistema;
    this.logoSistema = environment.loader.logoSistema
  }

  ngOnInit() {
  }

}


