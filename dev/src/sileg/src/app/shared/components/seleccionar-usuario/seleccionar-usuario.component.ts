import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, BehaviorSubject } from 'rxjs';
import { SilegService } from '../../services/sileg.service';
import { switchMap, debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.scss']
})
export class SeleccionarUsuarioComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  crear_persona: EventEmitter<any> = new EventEmitter<any>();

  private cargando: boolean = false;
  private existen_resultados$: Observable<boolean>;
  personas$: Observable<any[]>;

  form : FormGroup = null;

  constructor(private service: SilegService, private fb: FormBuilder) { 
    this.form = fb.group({
      campoBusqueda: ['']
    }, { updateOn: 'change'});
  }

  ngOnInit() {
    this.personas$ = this.form.get('campoBusqueda').valueChanges.pipe(      
      debounceTime(1000),
      distinctUntilChanged(),
      tap(_ => (this.cargando = true)),
      map(term => {
        if (term != null && term != undefined) {
          if (typeof term === 'string') {
            return term;
          }
          return term.dni;
        }
        return '';
      }),
      switchMap(term => this.service.buscarPersonas(term)),
      //map( ls => ls.filter( l => this.seleccionados.filter( l2 => l2.id == l.id).length <= 0)),
      tap(_ => (this.cargando = false))
    );

    this.existen_resultados$ = this.personas$.pipe(
        map(ls => ls.length <= 0)
      );
  }

  display_usuario(usuario?): string | undefined {
    return usuario ? usuario.dni : undefined;
  }

  /*
    Método llamado cuando se selecciona un lugar dentro del autocomplete
    NO se usa el submit del form para este caso.
  */
  autocomplete_seleccionado(event:MatAutocompleteSelectedEvent) {
    let persona = event.option.value;
    this._seleccionar_persona(persona);
  }

  private _seleccionar_persona(persona:any) {
    this.seleccionado.emit(persona);
  }

  private nuevo() {
    this.crear_persona.emit();
  }
}
