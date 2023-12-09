import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewInvestmentRoutingModule } from './new-investment-routing.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from "primeng/calendar";
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';
import { NewInvestmentComponent } from './new-investment.component';
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
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMatErrorModule,
  ]
})
export class NewInvestmentModule { }
