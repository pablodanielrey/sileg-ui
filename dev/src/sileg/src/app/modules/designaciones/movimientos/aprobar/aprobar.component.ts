import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss']
})
export class AprobarComponent {
  
  constructor(private service: SilegService,
    public dialogRef: MatDialogRef<AprobarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  aprobar() {
    this.service.aprobarMovimiento(this.data).subscribe( b => {
      this.dialogRef.close(b);
    })
  }
}
