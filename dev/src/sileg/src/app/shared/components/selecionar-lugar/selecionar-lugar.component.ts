import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SilegService } from '../../services/sileg.service';

@Component({
  selector: 'app-selecionar-lugar',
  templateUrl: './selecionar-lugar.component.html',
  styleUrls: ['./selecionar-lugar.component.scss']
})
export class SelecionarLugarComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  buscar$ = new BehaviorSubject<any>(null);
  lugares$: Observable<any[]>;

  constructor(private service: SilegService) { 
    this.buscar$.pipe(
      switchMap(s => this.service.buscarLugares(s))
    );
  }

  ngOnInit() {
  }

  buscar(s) {
    this.buscar$.next(s);
  }

  seleccionar(l) {
    this.seleccionado.emit(l);
  }

}
