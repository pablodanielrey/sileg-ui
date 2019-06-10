import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, of, forkJoin, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SilegService } from '../../../../../shared/services/sileg.service';
import { switchMap, map, tap, mergeMap, startWith } from 'rxjs/operators';
import { NavegarService } from '../../../../../core/navegar.service';
import { ErrorService } from '../../../../../core/error/error.service';
import { Cargo } from '../../../../../shared/entities/sileg';

@Component({
  selector: 'app-alta-cargo',
  templateUrl: './alta-cargo.component.html',
  styleUrls: ['./alta-cargo.component.scss']
})
export class AltaCargoComponent implements OnInit {

  form = this.fb.group({
    cargo: this.fb.group({
      nombre: ['', Validators.required],
      dedicacion: ['', Validators.required]
    }),
    caracter: ['', Validators.required],
    archivos: [[]]
  });

  caracteres$: Observable<any>;
  dedicaciones$: Observable<any>;
  cargos$: Observable<Cargo[]>;
  cargos_nombre$: Observable<Cargo[]>;

  datos$: Observable<any>;
  puntos$: Observable<any>;
  persona$: Observable<any>;
  lugar$: Observable<any>;
  archivos$: Observable<any[]>;

  cambio$: BehaviorSubject<any>;

  constructor(
    private route : ActivatedRoute,
    private service: SilegService,
    private navegar: NavegarService,
    private error: ErrorService,
    private fb: FormBuilder
  ) { }  

  ngOnInit() {
    this.cambio$ = new BehaviorSubject<string>('');

    this.cargos$ = this.service.obtenerCargosDisponibles();
    this.cargos_nombre$ = this.cargos$.pipe(
      map( cs => {
        return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.nombre == obj.nombre}))
      })
    );    

    this.caracteres$ = this.service.obtenerCaracter();

    let cargo_cg: FormGroup = this.form.get('cargo') as FormGroup;
    this.dedicaciones$ = cargo_cg.get('nombre').valueChanges.pipe(
      startWith(''),
      switchMap( nombre =>  {
        return this.cargos$.map(cs =>  {
          return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.dedicacion == obj.dedicacion && (obj.nombre == nombre || nombre == '')}))          
        })
      })
    )  

    this.datos$ = this.route.paramMap.pipe(
      map(p => { return {
          lugar: p.get("lid"),
          persona: p.get('pid')
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
      tap(v => console.log(v[1])),
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

    this.archivos$ = this.form.valueChanges.pipe(
      map(controles => controles.archivos)
    )

  }

  crear() {
    let ruta = JSON.parse(sessionStorage.getItem('finalizar_proceso'));
    let c = this.datos$.pipe(
      switchMap( v => {
        return this.service.crearDesignacion(this.form.value, v[0].id, v[1])
      }),
      tap( _ => {this.mostrar_error('se ha creado existósamente el alta')}),
      switchMap(_ => this.navegar.navegar(ruta, false))
    ).subscribe( _ => c.unsubscribe());
  }

  ////////////////////////////

  archivo_depto = null;
  archivo_docente = null;

  nota_depto(archivo) {
    console.log(archivo);
    this.archivo_depto = archivo;
  }

  nota_docente(archivo) {
    console.log(archivo);
    this.archivo_docente = archivo;
  }

  ////////////////////

  mostrar_error(e) {
    this.error.error({error:true, mensaje:e});
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

}
