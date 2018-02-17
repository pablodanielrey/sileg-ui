import { NgModule } from '@angular/core';

import { MatButtonModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatDialogModule
       } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
})
export class MyMaterialModule { }
