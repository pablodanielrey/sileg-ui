import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { error_object, ErrorService } from './error.service'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error$: Subject<error_object>;
  constructor(private service: ErrorService) {
    this.error$ = service.obtener_error();
  }

  ngOnInit() {
  }

  close() {
    this.service.error(null);
  }
}
