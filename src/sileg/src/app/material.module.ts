import { NgModule } from '@angular/core';

import { MatButtonModule,
         MatButtonToggleModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatDialogModule,
         MatStepperModule,
         MatMenuModule,
         MatSidenavModule,
         MatToolbarModule,
         MatDatepickerModule,
         MatCardModule,
         MatSlideToggleModule,
         MatTableModule,
         MatTabsModule,
         MatSortModule,
         MatSelectModule,
         MatNativeDateModule
       } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
})
export class MyMaterialModule { }
