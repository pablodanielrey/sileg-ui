import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SilegService } from '../../services/sileg.service';
import { switchMap, scan, map, tap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { reduce } from 'rxjs-compat/operator/reduce';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Lugar } from '../../entities/sileg';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-selecion-multiple-lugar',
  templateUrl: './selecion-multiple-lugar.component.html',
  styleUrls: ['./selecion-multiple-lugar.component.scss']
})


export class SelecionMultipleLugarComponent implements OnInit {
  
  @Output()
  seleccionado: EventEmitter<any[]> = new EventEmitter<any[]>();

  cargando: boolean = false;
  lugares$: Observable<any[]>;
  existen_resultados$: Observable<boolean>;
  seleccionados: any[] = [];


  form : FormGroup = null;
  
  constructor(private service: SilegService, private fb: FormBuilder) { 
    this.form = fb.group({
      campoBusqueda: ['']
    }, { updateOn: 'change'});
  }

  display_lugar(lugar?): string | undefined {
    return lugar ? lugar.nombre : undefined;
  }

  ngOnInit() {
    this.lugares$ = this.form.get('campoBusqueda').valueChanges.pipe(      
      debounceTime(1000),
      distinctUntilChanged(),
      tap(_ => (this.cargando = true)),
      map(term => {
        if (term != null && term != undefined) {
          if (typeof term === 'string') {
            return term;
          }
          return term.nombre;
        }
        return '';
      }),
      switchMap(term => this.service.buscarLugares(term)),
      //map( ls => ls.filter( l => this.seleccionados.filter( l2 => l2.id == l.id).length <= 0)),
      tap(_ => (this.cargando = false))
    );

    this.existen_resultados$ = this.lugares$.pipe(
        map(ls => ls.length <= 0)
      );
  }

  /*
    Método llamado cuando se selecciona un lugar dentro del autocomplete
    NO se usa el submit del form para este caso.
  */
  autocomplete_seleccionado(event:MatAutocompleteSelectedEvent) {
    this.form.get('campoBusqueda').setValue('');
    let lugar = event.option.value;
    this._seleccionar_lugar(lugar);
  }
  
  private _seleccionar_lugar(lugar:any) {
    if (this.seleccionados.filter(v => v.id == lugar.id).length > 0) {
      return;
    }
    this.seleccionados.push(lugar);
  }

  finalizar_seleccion() {
    this.seleccionado.emit(this.seleccionados);
  }  

  deseleccionar(l) {
    this.seleccionados = this.seleccionados.filter(v => v.id != l.id);
  }  

  /*
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



  finalizar_seleccion() {
    this.seleccionado.emit(this.lugares_seleccionados);
  }
*/


}
