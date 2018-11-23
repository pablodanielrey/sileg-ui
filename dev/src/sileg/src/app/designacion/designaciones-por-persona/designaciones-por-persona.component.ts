import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';

import { SilegService } from '../../sileg.service';
import { Designacion, Cargo, Lugar } from '../../entities/sileg';


class DesignacionView {
  lugar: Lugar = null;
  designaciones: MatTableDataSource<Designacion> = null;
}

@Component({
  selector: 'app-designaciones-por-persona',
  templateUrl: './designaciones-por-persona.component.html',
  styleUrls: ['./designaciones-por-persona.component.css']
})
export class DesignacionesPorPersonaComponent implements OnInit {

  cargando: boolean = false;
  designaciones : DesignacionView[];
  columnas: string[] = ['cargo','tipo_cargo','desde','hasta','expediente','resolucion','estado'];
  cargos: any[] = [];
  subscriptions: any[] = [];
  lugares: Lugar[] = [];

  constructor(private route : ActivatedRoute,
              private service : SilegService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let uid = p.get('id');
      this.service.buscarDesignaciones(uid).subscribe(ds => {
          console.log(ds);
          this.designaciones = this.procesar_para_vista(ds);
      });
    });    
  }

  procesar_para_vista(ds: Designacion[]): DesignacionView[] {

    console.log(ds);

    let nombres : string[] = [];
    let lugares : Lugar[] = [];
    
    ds.forEach(d => { 
      if (nombres.indexOf(d.lugar.nombre) == -1) {
        nombres.push(d.lugar.nombre);
        lugares.push(d.lugar);
      }
    });

    let r : DesignacionView[] = [];
    lugares.forEach(l => {

      let desig: Designacion[] = [];
      ds.forEach(d => {
        if (d.lugar_id == l.id) {
          desig.push(d);
        }
      });

      let dv = new DesignacionView()
      dv.lugar = l;
      dv.designaciones = new MatTableDataSource(desig);
      r.push(dv);
    });

    console.log(r);
    return r;
  }

  cargo(d:Designacion):Cargo {
    return d.cargo;
  }

  esDocente(d:Designacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'docente');
  }

  esNoDocente(d:Designacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'no docente');
  }

  esAutoridad(d:Designacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'autoridad');
  }

}
