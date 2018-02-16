import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SilegService } from '../sileg.service'
import { ResetClave } from '../entities/usuario'


@Component({
  selector: 'app-generar-clave',
  templateUrl: './generar-clave.component.html',
  styleUrls: ['./generar-clave.component.css']
})
export class GenerarClaveComponent implements OnInit {

  id: string = "";
  mensaje: string = "";
  dataClave: ResetClave;
  constructor(private route: ActivatedRoute, private location: Location, private service: SilegService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.generarClave(this.id);
  }

  volver(): void {
    this.location.back();
  }

  generarClave(uid:string): void {
    this.service.generarClave(uid)
      // .subscribe(data => this.mensaje = "Clave:" + clave: data['clave']);
      .subscribe(data => this.dataClave = data );

  }
}
