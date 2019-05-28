import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-descargar-archivos',
  templateUrl: './descargar-archivos.component.html',
  styleUrls: ['./descargar-archivos.component.scss']
})
export class DescargarArchivosComponent {

  constructor(private service: SilegService,
    public dialogRef: MatDialogRef<DescargarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    descargar_archivos() {
      this.dialogRef.close("");
    }

}
