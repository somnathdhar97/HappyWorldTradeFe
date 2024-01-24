import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRoutingModule } from './dialog-routing.module';
import { DialogComponent } from './dialog.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CustomMatErrorModule } from 'src/app/shared/helper/custom-mat-error/custom-mat-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttachmentPipe } from 'src/app/shared/helper/attachment.pipe';

@NgModule({
  declarations: [DialogComponent, AttachmentPipe],
  imports: [
    CommonModule,
    DialogRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMatErrorModule,
  ]
})
export class DialogModule { }
