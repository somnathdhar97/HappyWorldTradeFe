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
import { DialogComponent } from '../dialog/dialog.component';
import { AttachmentPipe } from 'src/app/shared/helper/attachment.pipe';
@NgModule({
  declarations: [InvestmentComponent, DialogComponent, AttachmentPipe],
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
