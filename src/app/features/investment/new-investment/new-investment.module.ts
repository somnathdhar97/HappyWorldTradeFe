import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInvestmentRoutingModule } from './new-investment-routing.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { NewInvestmentComponent } from './new-investment.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from "primeng/calendar";
@NgModule({
  declarations: [NewInvestmentComponent],
  imports: [
    CommonModule,
    NewInvestmentRoutingModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ]
})
export class NewInvestmentModule { }
