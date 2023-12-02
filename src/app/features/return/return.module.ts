import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRoutingModule } from './return-routing.module';
import { ReturnComponent } from './return.component';


@NgModule({
  declarations: [
    ReturnComponent
  ],
  imports: [
    CommonModule,
    ReturnRoutingModule
  ]
})
export class ReturnModule { }
