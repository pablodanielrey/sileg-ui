import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';

@Component({
  selector: 'app-denegar',
  templateUrl: './denegar.component.html',
  styleUrls: ['./denegar.component.scss']
})
export class DenegarComponent {

  constructor(public dialogRef: MatDialogRef<DenegarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private service: SilegService) {
    }

  denegar(): void {
    this.service.denegarMovimiento(this.data).subscribe( b => {
      this.dialogRef.close(b);
    })
    
  }

}
