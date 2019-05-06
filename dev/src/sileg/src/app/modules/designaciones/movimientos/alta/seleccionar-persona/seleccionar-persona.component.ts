import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { mergeMap, switchMap, tap, map } from 'rxjs/operators';
import { NavegarService } from '../../../../../core/navegar.service';
import { CrearComponent } from '../../baja/crear/crear.component';
import { SWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core/src/di/injectable';


@Component({
  selector: 'app-seleccionar-persona',
  templateUrl: './seleccionar-persona.component.html',
  styleUrls: ['./seleccionar-persona.component.scss']
})
export class SeleccionarPersonaComponent implements OnInit {

  persona$ = new BehaviorSubject<any>(null);

  constructor(private router: Router, private route: ActivatedRoute, private navegar: NavegarService) {
    /*
    this.persona$.pipe(
      mergeMap(p => forkJoin(
          of(p.id), 
          this.route.paramMap.pipe(map(pr => pr.get('lid')))
      )).pipe(
        tap(v => console.log(v))
      ).subscribe(vs =>
        {
          let pid = vs[0].id;
          let lid = vs[1].get('lid');
          this.navegar(pid, lid);
        }
      );
      */
  }

  ngOnInit() {
  }

  seleccionado(persona) {
    this.crear(persona);
  }

  crear(persona) {
    this.route.paramMap.pipe(
      switchMap(params => {
        let lid = params.get('lid');
        let pid = persona.id;
        return this.navegar.navegar({
          url:'/sistema/movimientos/crear/alta/' + lid + "/" + pid,
          params:{}
        })
      })
    ).subscribe();
  }

  crear_persona() {
    this.navegar.navegar({
      url:'/sistema/movimientos/crear/crear/lid',
      params:{}
    }).subscribe();
  }


  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

}
