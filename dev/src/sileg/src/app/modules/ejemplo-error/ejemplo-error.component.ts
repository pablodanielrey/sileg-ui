import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../core/error/error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavegarService, Ruta } from '../../core/navegar.service';

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
    })
  }

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': this.error});
  }  

  volver() {    
    let ruta: Ruta = this.navegarService.obtenerVolver();
    ruta = (ruta != null) ? ruta : {url: '/sistema/inicio', params: {}};
    this.navegarService.volver(ruta);
  }  

}
