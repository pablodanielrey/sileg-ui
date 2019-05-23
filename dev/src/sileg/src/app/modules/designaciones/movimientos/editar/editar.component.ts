import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, of, forkJoin, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SilegService } from '../../../../shared/services/sileg.service';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { NavegarService } from '../../../../core/navegar.service';
import { ErrorService } from '../../../../core/error/error.service';
import { Cargo, Designacion } from '../../../../shared/entities/sileg';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  form = this.fb.group({
    id: [''],
    cargo: this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      dedicacion: ['', Validators.required],
      tipo: ['', Validators.required],
      codigo: ['']
    }),
    caracter: ['', Validators.required]
  });

  caracteres$: Observable<any>;
  dedicaciones$: Observable<any>;
  cargos$: Observable<Cargo[]>;
  cargos_nombre$: Observable<Cargo[]>;

  datos$: Observable<any>;
  puntos$: Observable<any>;
  persona$: Observable<any>;
  lugar$: Observable<any>;

  cambio$: BehaviorSubject<any>;

  designacion$: Observable<Designacion>;

  constructor(
    private route : ActivatedRoute,
    private service: SilegService,
    private navegar: NavegarService,
    private error: ErrorService,
    private fb: FormBuilder
  ) { }  

  ngOnInit() {
    this.designacion$ = this.route.paramMap.pipe(
      switchMap( params => {
        if (params.has('mid')) {
          let mid = params.get('mid');
          return this.service.obtenerDesignacion(mid);
        } else {
          return null;
        }
      }),
      tap( desig => {
        console.log(desig);
        this.form.patchValue(desig);
        console.log(this.form);
      })
    );

    this.lugar$ = this.designacion$.pipe(
      map( d => {
        return d.lugar
      })
    )

    this.persona$ = this.designacion$.pipe(
      map( d => {
        return d.usuario
      })
    ) 


    this.cambio$ = new BehaviorSubject<string>('');

    this.cargos$ = this.service.obtenerCargosDisponibles();

    this.cargos_nombre$ = this.cargos$.pipe(
      map( cs => {
        return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.nombre == obj.nombre}))
      })
    );

    this.dedicaciones$ = this.cargos$.pipe(
      map (cs => {
        return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.dedicacion == obj.dedicacion}))
      })
    )

    this.caracteres$ = this.service.obtenerCaracter();
  
    // this.datos$ = this.route.paramMap.pipe(
    //   map(p => { return {
    //       lugar: p.get("lid"),
    //       persona: p.get('uid')
    //     }
    //   }),
    //   switchMap(parametros => forkJoin(
    //       this.service.obtenerLugar(parametros['lugar']),
    //       this.service.obtenerPersona(parametros['persona']),
    //       this.service.obtenerPuntosPersona(parametros['persona'])
    //     )
    //   )
    // );    


    // this.puntos$ = this.datos$.pipe(
    //   tap(v => console.log(v)),
    //   map(vs => vs[2])
    // );

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
