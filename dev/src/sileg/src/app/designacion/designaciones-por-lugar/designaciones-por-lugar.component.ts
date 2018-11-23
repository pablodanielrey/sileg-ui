import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';

import { SilegService } from '../../sileg.service';
import { DatoDesignacion, Cargo } from '../../entities/sileg';

@Component({
  selector: 'app-designaciones-por-lugar',
  templateUrl: './designaciones-por-lugar.component.html',
  styleUrls: ['./designaciones-por-lugar.component.css']
})
export class DesignacionesPorLugarComponent implements OnInit {

  cargando: boolean = false;
  lugar: any = null;
  designaciones : MatTableDataSource<DatoDesignacion> = null;
  columnas: string[] = ['fullname','dni','tipo_designacion','cargo','desde','hasta','lugar','estado'];  
  cargos: Cargo[] = [];
  subscriptions: any[] = [];

  constructor(private route : ActivatedRoute,
              private service : SilegService) { 
    this.designaciones = new MatTableDataSource();
  }

  ngOnInit() {
    this.obtenerTiposCargos();
    this.route.paramMap.subscribe(p => {
      let lid = p.get('id');
      this.service.buscarLugar(lid).subscribe(l => {
        this.lugar = l;
        this.service.obtenerDesignacionesLugares(lid).subscribe(ds => {
          console.log(ds);
          this.designaciones = new MatTableDataSource(ds.designaciones);
        });
      });
    });
  }

  obtenerTiposCargos() {
    this.cargos = [];
    this.subscriptions.push(this.service.cargos()
      .subscribe(r => {
        this.cargos = r;
        this.cargos.sort((c1:Cargo, c2:Cargo) => c1.nombre.localeCompare(c2.nombre));
      }));
  }

  cargo(d:DatoDesignacion):Cargo {
    let cid = d.designacion.cargo_id;
    for (var i = 0; i < this.cargos.length; i++) {
      if (cid == this.cargos[i].id) {
        return this.cargos[i];
      }
    }
    return null;
  }

  esDocente(d:DatoDesignacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'docente');
  }

  esNoDocente(d:DatoDesignacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'no docente');
  }

  esAutoridad(d:DatoDesignacion):boolean {
    let cargo = this.cargo(d);
    return (cargo != null && cargo.tipo.toLocaleLowerCase() == 'autoridad');
  }

}
