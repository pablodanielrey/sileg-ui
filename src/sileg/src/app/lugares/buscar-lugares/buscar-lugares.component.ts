import { Component, OnInit } from '@angular/core';
import { SilegService } from '../../sileg.service';
import { Lugar } from '../../entities/sileg';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar-lugares',
  templateUrl: './buscar-lugares.component.html',
  styleUrls: ['./buscar-lugares.component.css']
})
export class BuscarLugaresComponent implements OnInit {

  texto: string = '';
  lugares: Lugar[] = [];
  subscriptions: any[] = [];

  constructor(private service: SilegService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.lugares = [];
    this.texto = '';
    this.route.params.subscribe(params => {
      console.log(params);
      if(params['q'] && params['q'].trim() != '') {
        this.texto = params['q'].trim();
        this._buscar();
      }
    });
  }

  buscar() {
    this.router.navigate(['lugares/buscar', {q: this.texto}]);
  }

  _buscar() {
    this.subscriptions.push(this.service.buscarLugares(this.texto)
      .subscribe(datos => {

        /*
          TODO: ver si corresponde realmente aca o en otra función del controlador.
          genero los nombres de materias en la descripción de las cátedras.
        */
        interface Materia {
          nombre: string;
        };
        interface Catedra extends Lugar {
          nombre: string;
          descripcion: string;
          materia: Materia;
        };
        var d2 = datos.map(l => { 
          if ('materia' in l) {
            var c = <Catedra>l;
            c.descripcion = c.materia.nombre;
            return c;
          }
          return l;
        });
        /*
          /////////////// ver a donde se puede llevar ese código ///////////////
        */

        this.lugares = d2;
      }));
  }

}
