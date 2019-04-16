import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Ruta {
  url: string;
  params: {};
}

@Injectable({
  providedIn: 'root'
})

export class NavegarService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  generarVolver(url: string, back: Ruta) {
    sessionStorage.setItem(url, JSON.stringify(back));
  }

  obtenerVolver(): Ruta {
    let url = this.router.url.split('?')[0];
    if (sessionStorage.getItem(url)) {
      return JSON.parse(sessionStorage.getItem(url));
    } else {
      return null;
    }    
  }

  volver(ruta: Ruta) {
    if (ruta == null || ruta.url == null) {
      this.router.navigate(['/sistema/inicio']);  
    } else {
      this.router.navigate([ruta.url], {queryParams: ruta.params} );
    }    
  }

  navegar(ruta: Ruta) {
    let url = this.router.url.split('?')[0];
    let params = this.route.snapshot.queryParams;
    this.generarVolver(ruta.url, {url: url, params: params});
    this.router.navigate([ruta.url], {queryParams: ruta.params} )
  }
}
