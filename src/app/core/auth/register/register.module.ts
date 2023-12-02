import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { CustomMatErrorComponent } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.component';


@NgModule({
  declarations: [
    RegisterComponent,
    // CustomMatErrorComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
