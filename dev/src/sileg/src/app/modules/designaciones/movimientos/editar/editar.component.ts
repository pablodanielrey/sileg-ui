import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of, forkJoin, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SilegService } from '../../../../shared/services/sileg.service';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { NavegarService } from '../../../../core/navegar.service';
import { ErrorService } from '../../../../core/error/error.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

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

  datos$: Observable<any>;
  puntos$: Observable<any>;
  persona$: Observable<any>;
  lugar$: Observable<any>;

  cambio$: BehaviorSubject<any>;

  constructor(
    private route : ActivatedRoute,
    private service: SilegService,
    private navegar: NavegarService,
    private error: ErrorService
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

    this.datos$ = this.route.paramMap.pipe(
      map(p => { return {
          lugar: p.get("lid"),
          persona: p.get('uid')
        }
      }),
      switchMap(parametros => forkJoin(
          this.service.obtenerLugar(parametros['lugar']),
          this.service.obtenerPersona(parametros['persona']),
          this.service.obtenerPuntosPersona(parametros['persona'])
        )
      )
    );    

    this.persona$ = this.datos$.pipe(
      tap(v => console.log(v)),
      map(vs => vs[1])
    );

    this.lugar$ = this.datos$.pipe(
      tap(v => console.log(v)),
      map(vs => vs[0])
    );

    this.puntos$ = this.datos$.pipe(
      tap(v => console.log(v)),
      map(vs => vs[2])
    );

  }

  submit() {
    let v = this.form.value;
    this.cambio$.next(v.cargo);
  }

  crear() {
    console.log(this.form.value);
    // se genera el cargo

    // navegamos al final del proceso
    let ruta = JSON.parse(sessionStorage.getItem('finalizar_proceso'));
    let s = timer(2000).pipe(
      tap(_ => {this.mostrar_error('se ha creado existósamente el alta')}),
      switchMap(_ => this.navegar.navegar(ruta))
      ).subscribe(_ => {
        s.unsubscribe();
    });
  }

  mostrar_error(e) {
    this.error.error({error:true, mensaje:e});
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }


}
