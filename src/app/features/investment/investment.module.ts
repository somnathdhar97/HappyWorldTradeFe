import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentRoutingModule } from './investment-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InvestmentComponent } from './investment.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [InvestmentComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DynamicDialogModule
  ]
})
export class InvestmentModule { }
