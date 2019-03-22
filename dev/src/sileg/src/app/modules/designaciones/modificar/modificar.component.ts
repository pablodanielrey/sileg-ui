import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, tap, switchMap, filter } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';

import { SilegService } from '../../../shared/services/sileg.service';


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  form = new FormGroup({
    cargo: new FormControl(),
    dedicacion: new FormControl(),
    caracter: new FormControl(),
    expediente: new FormControl(),
    resolucion: new FormControl()
  });

  caracteres$: Observable<any>;
  dedicaciones$: Observable<any>;
  cargos$: Observable<any>;
  desig$: Observable<any>;
  puntos$: Observable<any>;
  p: any;

  cambio$: BehaviorSubject<any>;

  constructor(
    private route : ActivatedRoute,
    private service: SilegService
  ) { }  

  ngOnInit() {
    this.cambio$ = new BehaviorSubject<string>('');

    this.cargos$ = this.service.obtenerCargosDisponibles();

    this.caracteres$ = this.cambio$.pipe(
      switchMap(c => this.cargos$.pipe(
          map(vs => vs.filter(v => v.nombre == c.nombre))
        )
      )
    );
    this.dedicaciones$ = this.cambio$.pipe(
      switchMap(c => this.cargos$.pipe(
          map(vs => vs.filter(v => v.nombre == c.nombre))
        )
      )
    );

    this.puntos$ = this.cambio$.pipe(
      tap(v => console.log(v)),
      map(c => c.puntos)
    );

    this.desig$ = this.route.paramMap.pipe(
      map(p => p.get("id")),
      switchMap(pid => this.service.obtenerDesignacion(pid))
    )

  }

  submit() {
    let v = this.form.value;
    this.cambio$.next(v.cargo);
  }


}
