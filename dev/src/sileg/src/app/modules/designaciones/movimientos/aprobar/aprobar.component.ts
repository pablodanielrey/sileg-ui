import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss']
})
export class AprobarComponent implements OnInit {
  did$: Observable<string>;
  
  constructor(private service: SilegService,
              private navegar: NavegarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.did$ = this.route.queryParamMap.pipe(
      map(params => {
        return (params.has('did')) ? params.get('did') :null;
      })
    );    
  }

  aprobar() {
    let s = this.did$.pipe(
      switchMap( did => {
        return this.service.aprobarMovimiento(did)
      }),
      switchMap( ok => {
        if (ok) {
          return this.navegar.volver()
        } else {
          of(null)
        }
      })
    ).subscribe( _ => {
      s.unsubscribe();
    })
  }
}
