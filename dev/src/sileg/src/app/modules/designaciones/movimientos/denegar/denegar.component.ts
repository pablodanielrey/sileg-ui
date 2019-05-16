import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-denegar',
  templateUrl: './denegar.component.html',
  styleUrls: ['./denegar.component.scss']
})
export class DenegarComponent {

  constructor(
    public dialogRef: MatDialogRef<DenegarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
