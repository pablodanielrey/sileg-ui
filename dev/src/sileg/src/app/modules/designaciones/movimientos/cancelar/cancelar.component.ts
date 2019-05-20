import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.scss']
})
export class CancelarComponent {

  constructor(public dialogRef: MatDialogRef<CancelarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private service: SilegService) { }

  cancelar(): void {
    this.service.cancelarMovimiento(this.data).subscribe( b => {
      this.dialogRef.close(b);
    })
  }

}
