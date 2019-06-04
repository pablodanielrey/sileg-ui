import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor() { }

  es(perfil:string):boolean {
    return true;
  }

}
