import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';
import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';


@NgModule({
  declarations: [
    NoticeComponent
  ],
  imports: [
    CommonModule,
    NoticeRoutingModule,
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
export class NoticeModule { }
