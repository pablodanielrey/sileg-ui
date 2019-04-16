import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { SilegService } from '../../services/sileg.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selecionar-lugar',
  templateUrl: './selecionar-lugar.component.html',
  styleUrls: ['./selecionar-lugar.component.scss']
})
export class SelecionarLugarComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  private cargando: boolean = false;
  private lugares$: Observable<any[]>;
  private existen_resultados$: Observable<boolean>;
  private campoBusqueda: FormControl;

  constructor(private service: SilegService) { 
    this.campoBusqueda = new FormControl();
    this.lugares$ = this.campoBusqueda.valueChanges.pipe(      
      debounceTime(1000),
      distinctUntilChanged(),
      filter( v => v.trim() != ''),
      tap(_ => (this.cargando = true)),
      switchMap(term => this.service.buscarLugares(term)),
      tap(v => console.log(v)),
      tap(_ => (this.cargando = false))
    );

    this.existen_resultados$ = this.lugares$.pipe(
        map(ls => ls.length <= 0),
        tap(v => console.log(v))
      );

  }

  ngOnInit() {
  }

  seleccionar(l) {
    this.seleccionado.emit(l);
  }

}
