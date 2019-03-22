import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  titulo: string;
  imagen: string;

  constructor() {
    this.titulo = environment.loader.titulo;
    this.imagen = environment.loader.imagen;

    
  }

  ngOnInit() {
  }

  
  


}


