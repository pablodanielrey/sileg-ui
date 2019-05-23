import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-verificar-prestacion',
  templateUrl: './verificar-prestacion.component.html',
  styleUrls: ['./verificar-prestacion.component.scss']
})
export class VerificarPrestacionComponent {

  constructor(private service: SilegService,
    public dialogRef: MatDialogRef<VerificarPrestacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  verificar() {
    this.service.verificarPrestacion(this.data).subscribe( b => {
      this.dialogRef.close(b);
    })
  }


}
