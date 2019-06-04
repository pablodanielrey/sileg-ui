import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavegarService } from '../../../../../core/navegar.service';
import { SilegService } from '../../../../../shared/services/sileg.service';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: [''],
    celular: [''],
    email: ['', Validators.email],
  });

  constructor(
    private navegar: NavegarService,
    private fb: FormBuilder,
    private service: SilegService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  alta() {
    let data = this.form.value;

    let crear = this.service.crearPersona(data);
    let params = this.route.paramMap;

    let call$ = combineLatest(crear, params).pipe(
      switchMap( params => {
        let lid = params[1].get('lid');
        let pid = params[0].id;
        return this.navegar.navegar({
          url:'/sistema/movimientos/alta/alta-cargo/' + lid + '/' + pid,
          params:{}
        })        
      })
    ).subscribe( _=> { call$.unsubscribe() })
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }  

}
