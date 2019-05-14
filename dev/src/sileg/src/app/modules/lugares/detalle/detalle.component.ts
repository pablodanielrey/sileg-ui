import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavegarService } from '../../../core/navegar.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SilegService } from '../../../shared/services/sileg.service';
import { Observable, Subscription } from 'rxjs';
import { Lugar } from '../../../shared/entities/sileg';
import { switchMap, tap } from 'rxjs/operators';
import { PreloadService } from '../../../core/preload/preload.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  form = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: [''],
    tipo: [''],
    oficina: [''],
    telefono: [''],
    correo: ['']
  })

  lugar$: Observable<Lugar>;
  tipos$: Observable<string[]>;

  constructor(private navegar: NavegarService, private service: SilegService,
              private route: ActivatedRoute, private fb: FormBuilder) { }
 

  ngOnInit() {
    this.tipos$ = this.service.obterTipoLugar();
    this.lugar$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has('lid')) {
          let lid = params.get('lid');
          return this.service.obtenerLugar(lid);
        } else {
          return null;
        }
      }),
      tap( lugar => {
        this.form.patchValue(lugar);
      })
    );
    
  }

  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

  designaciones() {
    let s = this.lugar$.pipe(
      switchMap( l => {
        return this.navegar.navegar({
          url: '/sistema/designaciones/listar/listar/' + l.id,
          params: {}
        })
      })
    ).subscribe(_ => {
      s.unsubscribe();
    })
  }

  submit() {
    this.service.guardarLugar(this.form.value).subscribe(_ => {      
      
    })
  }

}
