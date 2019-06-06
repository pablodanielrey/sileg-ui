import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavegarService } from '../../../core/navegar.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SilegService } from '../../../shared/services/sileg.service';
import { Observable, Subscription, of } from 'rxjs';
import { Lugar } from '../../../shared/entities/sileg';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { PreloadService } from '../../../core/preload/preload.service';
import { ErrorService } from '../../../core/error/error.service';

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
    correo: ['', Validators.email]
  })

  lugar$: Observable<Lugar>;
  tipos$: Observable<string[]>;

  constructor(private navegar: NavegarService,
              private service: SilegService,
              private preload: PreloadService,
              private route: ActivatedRoute,
              private error: ErrorService,
              private fb: FormBuilder) { }
 

  mostrar_error(err: string) {
    this.error.error({error:true, mensaje: err});
  }
  ngOnInit() {
    
    this.tipos$ = this.service.obterTipoLugar();
    this.lugar$ = this.route.paramMap.pipe(
      tap( _ => this.preload.activar_preload_parcial()),
      switchMap((params: ParamMap) => {        
        if (params.has('lid')) {
          let lid = params.get('lid');
          return this.service.obtenerLugar(lid);
        } else {
          return of(new Lugar({}));
        }
      }),
      catchError( err => {    
        this.mostrar_error(err);
        return of(new Lugar({}));
      }),
      tap( lugar => {
        this.preload.desactivar_preload_parcial();
        if (lugar == undefined || lugar == null) {
          lugar = new Lugar({});
          this.mostrar_error("No se encontro el lugar");
        }
        this.form.patchValue(lugar);
      }),
      finalize(() => 
        this.preload.desactivar_preload_parcial()
      )
        
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

  crear_alta() {
    let navegar_alta = this.lugar$.pipe(
      switchMap( l => {
        return this.navegar.navegar({
          url: '/sistema/movimientos/alta/seleccionar-persona/'+l.id,
           params: {}
         });
      })
    )
    
     let s = this.navegar.obtenerRuta().pipe(
      tap(ruta_actual => {
        sessionStorage.setItem('finalizar_proceso', JSON.stringify(ruta_actual));
      }),
      switchMap(v => navegar_alta)
    ).subscribe( v => s.unsubscribe())
  }  

}
