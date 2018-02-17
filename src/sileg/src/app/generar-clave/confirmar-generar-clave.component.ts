import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirmar-generar-clave',
  templateUrl: 'confirmar-generar-clave.html',
  styleUrls: ['confirmar-generar-clave.css'],
})
export class ConfirmarGenerarClaveComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarGenerarClaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  onYesClick(): void {
    this.dialogRef.close(1);
  }
}
