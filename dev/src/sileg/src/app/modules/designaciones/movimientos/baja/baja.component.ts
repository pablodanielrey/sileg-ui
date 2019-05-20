import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.scss']
})
export class BajaComponent {

  constructor(public dialogRef: MatDialogRef<BajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private service: SilegService) { }

  baja_movimiento() {
    this.service.bajaMovimiento(this.data).subscribe( b => {
      this.dialogRef.close(b);
    })
  }
}
