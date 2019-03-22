import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SilegService } from '../../../shared/services/sileg.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  desig$: Observable<any>;
  p: any;

  constructor(
    private route : ActivatedRoute,
    private service: SilegService
  ) { }  

  ngOnInit() {
    this.desig$ = this.route.paramMap.pipe(
      map(p => p.get("id")),
      switchMap(pid => this.service.obtenerDesignacion(pid))
    )
  }

}
