import { Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class NotificacionesService {

  constructor() { }

  show(msg:string):void {
    alert(msg);
  }

}
