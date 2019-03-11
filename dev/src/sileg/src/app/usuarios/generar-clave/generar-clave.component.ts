import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material';
import { ConfirmarGenerarClaveComponent } from '../generar-clave/confirmar-generar-clave.component'

import { SilegService } from '../../shared/services/sileg.service'
import { ResetClave } from '../../shared/entities/usuario'


@Component({
  selector: 'app-generar-clave',
  templateUrl: './generar-clave.component.html',
  styleUrls: ['./generar-clave.component.css']
})
export class GenerarClaveComponent implements OnInit {

  id: string = "";
  dataClave: ResetClave;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: SilegService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //this.generarClave(this.id);
    setTimeout(() => {
      let dialogRef = this.dialog.open(ConfirmarGenerarClaveComponent, {
          width: '250px'
      });
      dialogRef.afterClosed().subscribe(r => { r == 1 ? this.generarClave(this.id) : this.volver() });
    });
  }

  volver(): void {
    this.location.back();
  }

  generarClave(uid:string): void {
    this.service.generarClave(uid).subscribe(data => this.dataClave = data );
  }
}
