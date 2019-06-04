import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { mergeMap, switchMap, tap, map } from 'rxjs/operators';
import { NavegarService } from '../../../../../core/navegar.service';



@Component({
  selector: 'app-seleccionar-persona',
  templateUrl: './seleccionar-persona.component.html',
  styleUrls: ['./seleccionar-persona.component.scss']
})
export class SeleccionarPersonaComponent implements OnInit {

  persona$ = new BehaviorSubject<any>(null);

  constructor(private router: Router, private route: ActivatedRoute, private navegar: NavegarService) {
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
          url:'/sistema/movimientos/alta/alta-cargo/' + lid + '/' + pid,
          params:{}
        })
      })
    ).subscribe();
  }

  crear_persona() {

    this.route.paramMap.pipe(
      switchMap( params => {
        let lid = params.get('lid');
        return this.navegar.navegar({
          url:'/sistema/movimientos/alta/crear-persona/'+ lid,
          params:{}
        })        
      })
    ).subscribe();
  }


  volver() {
    this.navegar.volver().subscribe().unsubscribe();
  }

}
