import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../core/error/error.service';

@Component({
  selector: 'app-ejemplo-error',
  templateUrl: './ejemplo-error.component.html',
  styleUrls: ['./ejemplo-error.component.scss']
})
export class EjemploErrorComponent implements OnInit {

  constructor(private error_service: ErrorService) { }
  error: string = 'Texto del error';
  ngOnInit() {
  }

  mostrar_error() {
    this.error_service.error({'error': true, 'mensaje': this.error});
  }  

}
