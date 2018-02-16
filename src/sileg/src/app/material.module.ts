import { NgModule } from '@angular/core';

import { MatButtonModule,
         MatIconModule,
         MatInputModule,
         MatListModule
       } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule
  ],
})
export class MyMaterialModule { }
