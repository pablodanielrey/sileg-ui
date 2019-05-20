import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-enviar-unlp',
  templateUrl: './enviar-unlp.component.html',
  styleUrls: ['./enviar-unlp.component.scss']
})
export class EnviarUnlpComponent {

  constructor(private service: SilegService,
    public dialogRef: MatDialogRef<EnviarUnlpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    enviar_unlp() {
      this.service.enviarUnlpMovimiento(this.data).subscribe( b => {
        this.dialogRef.close(b);
      })
    }    

}
