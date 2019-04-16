import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../services/sileg.service';
import { switchMap, debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.scss']
})
export class SeleccionarUsuarioComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  private campoBusqueda: FormControl;
  private cargando: boolean = false;
  private existen_resultados$: Observable<boolean>;
  personas$: Observable<any[]>;

  constructor(private service: SilegService) { 
    this.campoBusqueda = new FormControl();
    this.personas$ = this.campoBusqueda.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter( v => v.trim() != ''),
      tap(_ => (this.cargando = true)),
      switchMap(s => this.service.buscarPersonas(s)),
      tap(v => console.log(v)),
      tap(_ => (this.cargando = false))
    );

    this.existen_resultados$ = this.personas$.pipe(
      map(ls => ls.length <= 0),
      tap(v => console.log(v))
    );    
  }

  ngOnInit() {
  }

  seleccionar(p) {
    this.seleccionado.emit(p);
  }

}
