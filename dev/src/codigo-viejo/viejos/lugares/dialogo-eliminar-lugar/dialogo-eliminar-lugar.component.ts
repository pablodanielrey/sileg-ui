import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-eliminar-lugar',
  templateUrl: './dialogo-eliminar-lugar.component.html',
  styleUrls: ['./dialogo-eliminar-lugar.component.css']
})
export class DialogoEliminarLugarComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarLugarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
