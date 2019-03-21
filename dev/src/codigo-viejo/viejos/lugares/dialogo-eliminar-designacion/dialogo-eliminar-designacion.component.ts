import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-eliminar-designacion',
  templateUrl: './dialogo-eliminar-designacion.component.html',
  styleUrls: ['./dialogo-eliminar-designacion.component.css']
})
export class DialogoEliminarDesignacionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarDesignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
