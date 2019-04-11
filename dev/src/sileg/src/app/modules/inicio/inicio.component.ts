import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { VolverService } from '../../core/volver.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  back$: Observable<any>;

  constructor(private route: ActivatedRoute, 
              private volverService: VolverService,
              private router: Router) { 
  }

  ngOnInit() {    
    this.back$ = this.volverService.obtenerVolver(this.route);
    this.back$.subscribe( p => console.log(p));
  }

  recargar() {


    let volver = {
      ruta: '/sistema/inicio',
      parametros: [
        {param1: 'valor1'}, {param2: 10}, {param3:'12'}
      ]
    }

    let paramBack = this.volverService.generarVolver(volver.ruta, volver.parametros);
    this.router.navigate([volver.ruta], paramBack);
  }

  volver() {    
    this.volverService.navegar(this.back$);
  }




  // navigate(r, volver) {
  //   let ruta = this.decodicficar(r);
  //   let ruta_volver =this.codificar(volver);
  //   let parametros = ruta.parametros.push()
  //   this.router.navigate(ruta.ruta, ruta.parametros)
  // }

}
