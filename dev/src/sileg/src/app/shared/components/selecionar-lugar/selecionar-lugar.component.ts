import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { SilegService } from '../../services/sileg.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-selecionar-lugar',
  templateUrl: './selecionar-lugar.component.html',
  styleUrls: ['./selecionar-lugar.component.scss']
})
export class SelecionarLugarComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  cargando: boolean = false;
  lugares$: Observable<any[]>;
  existen_resultados$: Observable<boolean>;
  
  form : FormGroup = null;


  constructor(private service: SilegService, private fb: FormBuilder) { 
    this.form = fb.group({
      campoBusqueda: ['']
    }, { updateOn: 'change'});
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

  display_lugar(lugar?): string | undefined {
    return lugar ? lugar.nombre : undefined;
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
    this.seleccionado.emit(lugar);
  }

}
