import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, of, forkJoin, timer, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SilegService } from '../../../../shared/services/sileg.service';
import { switchMap, map, tap, mergeMap, startWith, filter, combineLatest } from 'rxjs/operators';
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

  designacion$: Observable<Designacion>;
  form_value$: Observable<Designacion>;

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
      })
    );    
    this.lugar$ = this.designacion$.pipe(
      map( d => {
        return d.lugar
      })
    ); 
    
    this.persona$ = this.designacion$.pipe(
      map( d => {
        return d.usuario
      })
    );    

    this.form_value$ = this.designacion$.pipe(
      tap( desig => {
        this.form.patchValue(desig);
      })
    );   

    this.cargos$ = this.service.obtenerCargosDisponibles();

    this.cargos_nombre$ = this.cargos$.pipe(
      map( cs => {
        return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.nombre == obj.nombre}))
      })
    );

    let cargo_cg: FormGroup = this.form.get('cargo') as FormGroup;
    this.dedicaciones$ = cargo_cg.get('nombre').valueChanges.pipe(
      startWith(''),
      switchMap( nombre =>  {
        return this.cargos$.map(cs =>  {
          return cs.filter((item, pos) => pos == cs.findIndex(obj => { return item.dedicacion == obj.dedicacion && (obj.nombre == nombre || nombre == '')}))          
        })
      })
    )  

    this.caracteres$ = this.service.obtenerCaracter();
  }

  onSubmit() {
    let v = this.form.value;
    this.designacion$.pipe(
      switchMap (d => {
        return this.service.modificarMovimiento(d.id, v.cargo, v.caracter)
      })
    ).subscribe( r => {
      this.volver();   
    }).unsubscribe();
  }

  mostrar_error(e) {
    this.error.error({error:true, mensaje:e});
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }


}
