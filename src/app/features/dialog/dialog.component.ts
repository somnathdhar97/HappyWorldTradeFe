import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogData: any;
  approveInvestmentForm: FormGroup;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private vs: ValidationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dialogData = this.config.data;
    console.log(this.dialogData);
    if (this.dialogData.mode == 'Approve Investment') {
      this.approveInvestmentForm = this.fb.group({
        percentageRate: ['', Validators.required]
      })
    }
  }

  submit() {
    console.log(this.approveInvestmentForm.value);
  }
}
