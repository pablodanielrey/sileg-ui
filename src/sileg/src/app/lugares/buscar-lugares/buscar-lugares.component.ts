import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { Lugar } from '../../entities/sileg';

@Component({
  selector: 'app-buscar-lugares',
  templateUrl: './buscar-lugares.component.html',
  styleUrls: ['./buscar-lugares.component.css']
})
export class BuscarLugaresComponent implements OnInit {

  texto: string = '';
  lugares: Lugar[] = [];
  subscriptions: any[] = [];

  constructor(private service: SilegService) { }

  ngOnInit() {
    this.texto = '';
    this.lugares = [];
  }

  buscar() {
      this.subscriptions.push(this.service.buscarLugares(this.texto)
        .subscribe(datos => {
          this.lugares = datos;
        }));
  }

}
