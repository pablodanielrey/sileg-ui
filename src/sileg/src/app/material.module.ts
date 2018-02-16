import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatIconModule,
         MatListModule
       } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
})
export class MyMaterialModule { }
