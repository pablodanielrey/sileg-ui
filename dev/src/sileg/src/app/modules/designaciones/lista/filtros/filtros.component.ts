import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';
import { NavegarService } from '../../../../core/navegar.service';

interface FiltroParam {
  lid: string;
  pendientes: boolean;
  actuales: boolean;
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})

export class FiltrosComponent {

  constructor(private service: SilegService,
    private navegar: NavegarService,
    public dialogRef: MatDialogRef<FiltrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FiltroParam) { }

  
  filtrar() {
    let actuales = false;
    let pendientes = true;
    let navegar_alta = this.navegar.navegar({
      url: '/sistema/designaciones/listar/listar/'+ this.data.lid,
       params: {'actuales': actuales, 'pendientes': pendientes}
     }).subscribe(() => {
       navegar_alta.unsubscribe();
     })    
    this.dialogRef.close("");
  }

}
