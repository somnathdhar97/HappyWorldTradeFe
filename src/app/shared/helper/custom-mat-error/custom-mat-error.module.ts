import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMatErrorComponent } from './custom-mat-error.component';



@NgModule({
  declarations: [CustomMatErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomMatErrorComponent,
  ]
})
export class CustomMatErrorModule { }
