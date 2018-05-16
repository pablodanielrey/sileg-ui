import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { Lugar } from '../../entities/sileg';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

export interface Tipo {
  nombre: string;
  id: string;
}


@Component({
  selector: 'app-detalle-lugar',
  templateUrl: './detalle-lugar.component.html',
  styleUrls: ['./detalle-lugar.component.css']
})
export class DetalleLugarComponent implements OnInit {

  tipos = [
    {nombre: 'Oficina', value: 'oficina'},
    {nombre: 'Cátedra', value: 'catedra'},
    {nombre: 'Lugar Dictado', value: 'lugar dictado'},
    {nombre: 'Centro', value: 'centro'},
    {nombre: 'Comisión', value: 'comision'},
    {nombre: 'Departamento', value: 'departamento'},
    {nombre: 'Dirección', value: 'direccion'},
    {nombre: 'Escuela', value: 'escuela'},
    {nombre: 'Externo', value: 'externo'},
    {nombre: 'Facultad', value: 'facultad'},
    {nombre: 'Instituto', value: 'instituto'},
    {nombre: 'Maestría', value: 'maestria'},
    {nombre: 'Prosecretaría', value: 'prosecretaria'},
    {nombre: 'Secretaría', value: 'secretaria'},
    {nombre: 'Seminario', value: 'seminario'},
    {nombre: 'Universidad', value: 'universidad'}
  ]
  lugar: Lugar = new Lugar({});
  subscriptions: any[] = [];

  constructor(private service: SilegService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.obtenerLugar(params.get('id'));
  }

  obtenerLugar(id: string) {
    if (id == null) {
      this.volver();
    } else {
      this.subscriptions.push(this.service.buscarLugar(id)
        .subscribe(r => {
          console.log(r);
          this.lugar = r;
        }));
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  guardar() {
    this.subscriptions.push(this.service.modificarLugar(this.lugar)
      .subscribe(r => {
        console.log(r);
      }));

  }

}
