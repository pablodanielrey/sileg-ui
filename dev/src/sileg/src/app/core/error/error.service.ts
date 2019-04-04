import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface error_object {
  error: boolean,
  mensaje: string
}

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  error_subj = new BehaviorSubject<error_object>({'error': false, 'mensaje': ''});
  constructor() { }


  obtener_error(): Subject<error_object> {
    return this.error_subj;
  }

  error(err: error_object) {
    this.error_subj.next(err);
  }

}
