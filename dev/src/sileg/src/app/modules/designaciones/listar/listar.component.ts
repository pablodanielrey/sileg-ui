import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SilegService } from '../../../shared/services/sileg.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas: string[] = ['usuario','puntos'];
  lugares$: Observable<any[]>;

  constructor(private service : SilegService) { }

  ngOnInit() {
    let lid = "1f7b87ea-96b7-428c-8a00-fd33e1ba3ee6";
 
    this.lugares$ = this.service.desginacionesPendientes([lid]).pipe(
      map( v => {
        let a = [];
        for(let e of v) {
          a.push({
            lugar: e.lugar,
            ptos_alta: e.ptos_alta,
            ptos_baja: e.ptos_baja,
            designaciones$: of(e.designaciones)
          })
        }
        return a
      }),
      tap(v => console.log(v))
    )  
  }

}
