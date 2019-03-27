import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  preload_completo = new BehaviorSubject<boolean>(false);
  preload_parcial = new BehaviorSubject<boolean>(false);

  constructor() { }

  obtener_preload_completo(): Subject<boolean> {
    return this.preload_completo;
  }

  obtener_preload_parcial(): Subject<boolean> {
    return this.preload_parcial;
  }


  
}
