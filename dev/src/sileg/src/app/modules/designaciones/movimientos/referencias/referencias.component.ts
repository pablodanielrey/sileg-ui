import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss']
})
export class ReferenciasComponent {

  constructor(
    public dialogRef: MatDialogRef<ReferenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string    
  ) { }

  _cerrar() {
    this.dialogRef.close(true);
  }

}
