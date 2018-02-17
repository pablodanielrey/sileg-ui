import { NgModule } from '@angular/core';

import { MatButtonModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatDialogModule,
         MatStepperModule,
       } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    BrowserAnimationsModule
  ],
})
export class MyMaterialModule { }
