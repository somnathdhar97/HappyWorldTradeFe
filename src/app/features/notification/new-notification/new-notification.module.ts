import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewNotificationRoutingModule } from './new-notification-routing.module';
import { NewNotificationComponent } from './new-notification.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from "primeng/calendar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';

@NgModule({
  declarations: [NewNotificationComponent],
  imports: [
    CommonModule,
    NewNotificationRoutingModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMatErrorModule
  ]
})
export class NewNotificationModule { }
