import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../services/sileg.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.scss']
})
export class SeleccionarUsuarioComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  buscar$ = new BehaviorSubject<any>(null);
  personas$: Observable<any>;

  constructor(private service: SilegService) { 

    this.personas$ = this.buscar$.pipe(
      switchMap(s => this.service.buscarPersonas(s))
    );
  }

  ngOnInit() {
    this.buscar('asdsdsdf');
  }

  buscar(s) {
    this.buscar$.next(s);
  }

  seleccionar(p) {
    this.seleccionado.emit(p);
  }

}
