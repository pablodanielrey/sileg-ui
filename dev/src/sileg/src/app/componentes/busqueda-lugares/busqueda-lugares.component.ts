import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Lugar } from '../../entities/sileg';

@Component({
  selector: 'app-busqueda-lugares',
  templateUrl: './busqueda-lugares.component.html',
  styleUrls: ['./busqueda-lugares.component.css']
})
export class BusquedaLugaresComponent implements OnInit {

  texto: string = '';
  lugares: Lugar[] = [ 
                    new Lugar({'id':'asdasd','nombre':'lugar 1', 'descripcion':'algo de descripcion', 'tipo':'asdsadas'}), 
                    new Lugar({'id':'asdasd','nombre':'lugar 2', 'descripcion':'algo de descripcion2', 'tipo':'asdsadas'}) 
                  ];

  @Output() seleccionado = new EventEmitter<Lugar>();

  constructor() { }

  ngOnInit() {
  }


  buscar() {

  }

  seleccionar(lugar) {
    this.seleccionado.emit(lugar);
  }

}
