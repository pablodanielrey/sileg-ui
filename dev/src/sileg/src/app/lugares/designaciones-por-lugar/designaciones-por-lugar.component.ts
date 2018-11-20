import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SilegService } from '../../sileg.service';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-designaciones-por-lugar',
  templateUrl: './designaciones-por-lugar.component.html',
  styleUrls: ['./designaciones-por-lugar.component.css']
})
export class DesignacionesPorLugarComponent implements OnInit {

  cargando: boolean = false;
  lugar: any = null;
  designaciones : MatTableDataSource<any> = null;
  columnas: string[] = [];  

  constructor(private route : ActivatedRoute,
              private service : SilegService) { 
    this.designaciones = new MatTableDataSource();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      let lid = p.get('id');
      this.service.buscarLugar(lid).subscribe(l => {
        this.lugar = l;
      });
    });
  }

}
