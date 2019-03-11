import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // menu_abierto: boolean = false;

  // onMenu(abierto: boolean):void {
  //   this.menu_abierto = !this.menu_abierto;
  // }

  // onOpenedChange(abierto: boolean): void {
  //   this.menu_abierto = abierto;
  // }

  // onItem(v:boolean):void {
  //   this.menu_abierto = v;
  // }

  cerrar_menu(d) {
    d.toggle();
    console.log('cerrar_menu');
  } 

}
