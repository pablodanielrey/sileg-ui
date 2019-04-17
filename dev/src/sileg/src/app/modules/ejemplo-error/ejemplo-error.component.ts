import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../core/error/error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { NavegarService, Ruta } from '../../core/navegar.service';
import { mergeMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-ejemplo-error',
  templateUrl: './ejemplo-error.component.html',
  styleUrls: ['./ejemplo-error.component.scss']
})
export class EjemploErrorComponent implements OnInit {

  error: string = 'Texto del error';
  
  constructor(private error_service: ErrorService,
              private route: ActivatedRoute, 
              private navegarService: NavegarService,
              private router: Router) { }
  
  ngOnInit() {    
    this.route.queryParamMap.subscribe( p => {
      if (p.has('error')) {
        this.error = p.get('error');
      }
    });
  }

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': this.error});
  }  

  subscriptions: any[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  volver() {    
    this.subscriptions.push(this.navegarService.volver('/sistema/inicio').subscribe());
  }

}
