import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AdminRegistrationRoutingModule } from './admin-registration-routing.module';
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';
import { AdminRegistrationComponent } from './admin-registration.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [AdminRegistrationComponent],
  imports: [
    CommonModule,
    AdminRegistrationRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    CustomMatErrorModule,
    DropdownModule
  ]
})
export class AdminRegistrationModule { }
