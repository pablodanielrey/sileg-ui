import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent {

  constructor(private service: SilegService,
    public dialogRef: MatDialogRef<FiltrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  
  filtrar() {
    this.dialogRef.close("");
  }

}
