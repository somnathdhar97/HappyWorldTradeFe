import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountCardComponent } from './count-card.component';



@NgModule({
  declarations: [CountCardComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CountCardComponent
  ]
})
export class CountCardModule { }
