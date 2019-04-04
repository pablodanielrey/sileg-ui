import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SilegService } from '../../services/sileg.service';
import { switchMap, scan, map, tap } from 'rxjs/operators';
import { reduce } from 'rxjs-compat/operator/reduce';
import { filter } from 'rxjs-compat/operator/filter';

@Component({
  selector: 'app-selecion-multiple-lugar',
  templateUrl: './selecion-multiple-lugar.component.html',
  styleUrls: ['./selecion-multiple-lugar.component.scss']
})
export class SelecionMultipleLugarComponent implements OnInit {
  
  @Output()
  seleccionado: EventEmitter<any[]> = new EventEmitter<any[]>();

  
  buscar$ = new BehaviorSubject<any>(null);
  lugares_seleccionados: any[] = [];

  lugares_no_seleccionados$: Observable<any[]>;
  lugares_seleccionados$ = new BehaviorSubject<any[]>([]);
  lugares$: Observable<any[]>;
  
  accion$ = new BehaviorSubject<any>(null);

  constructor(private service: SilegService) { 
    this.lugares$ = this.buscar$.pipe(
      tap(v => console.log(v)),
      switchMap(s => this.service.buscarLugares(s))
    );
    this.lugares_no_seleccionados$ = this.accion$.pipe(
      switchMap(v => 
        this.lugares$.pipe(
          map(ls => ls.filter(l => this.lugares_seleccionados.filter(l2 => l.id == l2.id).length <= 0 )),
          tap(v => console.log(v))      
        )
      )
    )
  }

  ngOnInit() {
  }

  buscar(s) {
    this.buscar$.next(s);
  }

  seleccionar(l) {
    if (this.lugares_seleccionados.filter(v => v.id == l.id).length <= 0) {
      this.lugares_seleccionados.push(l);
      this.lugares_seleccionados$.next(this.lugares_seleccionados);
      this.accion$.next(true);
    }
  }

  deseleccionar(l) {
    this.lugares_seleccionados = this.lugares_seleccionados.filter(v => v.id != l.id);
    this.lugares_seleccionados$.next(this.lugares_seleccionados);
    this.accion$.next(true);
  }

  finalizar_seleccion() {
    this.seleccionado.emit(this.lugares_seleccionados);
  }

}