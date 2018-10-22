import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-confirmacion',
  templateUrl: 'create-confirmacion.component.html',
  styleUrls: ['create-confirmacion.component.css'],
})
export class CreateConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  onYesClick(): void {
    this.dialogRef.close(1);
  }
}
