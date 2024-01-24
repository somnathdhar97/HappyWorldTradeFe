import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { approveInvestments } from 'src/app/core/models/Iinvesment';
import { AuthService } from 'src/app/core/services/auth.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
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
  approveInvestment: approveInvestments;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private vs: ValidationService,
    private fb: FormBuilder,
    private investmentService: InvesmentService
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
    if (this.approveInvestmentForm.valid) {
      this.approveInvestment = {
        id: this.dialogData.investmentId,
        percentageRate: this.approveInvestmentForm.value.percentageRate
      };
      this.investmentService.approveInvesment(this.approveInvestment).subscribe(resp => {
        if (resp.apiResponseStatus == 1) {
          this.toastService.showSuccess(resp.message);
        } else {
          this.toastService.showError(resp.message);
        }
      });
    } else {
      this.approveInvestmentForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }
}
