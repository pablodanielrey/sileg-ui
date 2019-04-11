import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VolverService {

  constructor(private router: Router) { }

  generarVolver(url, params): Object {
    let sjson = btoa(JSON.stringify({ url: url, params: params}));
    return { back: sjson };
  }

  obtenerVolver(route: ActivatedRoute): Observable<any> {
    return route.queryParamMap.pipe(
      map( p => 
        (p.has('back')) ? JSON.parse(atob(p.get('back'))) : { url: '/sistema/inicio', params: {}}
      )
    );
  }

  navegar(ruta: Observable<any>) {
    ruta.subscribe(p => { 
      console.log(p);
      this.router.navigate([p.url], {queryParams: p.params} )
    })
  }
}
