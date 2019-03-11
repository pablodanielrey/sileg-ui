import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {
  pantallaPrincipalLogo: string;

  constructor() {
    let img = environment.pantallaPrincipalLogo;
    this.pantallaPrincipalLogo= 'url(' + img +')';
  }

  ngOnInit() {
  }

}
