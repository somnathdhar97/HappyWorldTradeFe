import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAdminUserRoutingModule } from './new-admin-user-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAdminUserComponent } from './new-admin-user.component';
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [NewAdminUserComponent],
  imports: [
    CommonModule,
    NewAdminUserRoutingModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMatErrorModule,
    PasswordModule,
    DropdownModule
  ]
})
export class NewAdminUserModule { }
