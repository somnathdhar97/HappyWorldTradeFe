import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardComponent } from './menu-card.component';


@NgModule({
  declarations: [MenuCardComponent],
  imports: [
    CommonModule,
  ],exports:[
    MenuCardComponent
  ]
})
export class MenuCardModule { }
