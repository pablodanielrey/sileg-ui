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
        this.lugares = datos;
      }));
  }

}
