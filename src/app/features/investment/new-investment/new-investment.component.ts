import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IInsertInvestment } from 'src/app/core/models/Iinvesment';
import { IInvestment, IPaymentMethod, IScheme, ITenure, IUser } from 'src/app/core/models/master';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrls: ['./new-investment.component.scss']
})
export class NewInvestmentComponent implements OnInit {
  investmentForm: FormGroup;
  investmentData: IInsertInvestment;
  schemes: IScheme[] = [];
  tenures: ITenure[] = [];
  users: IUser[] = [];
  paymentMethods: IPaymentMethod[] = [];

  constructor(private fb: FormBuilder, private vs: ValidationService, private toastService: ToastService, private masterService: MasterService, private invesmentService: InvesmentService, private router: Router) { }
  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      userName: this.vs.validation('Required', 0, 100, 100),
      scheme: this.vs.validation('Required', 0, 100, 100),
      tenure: this.vs.validation('Required', 0, 100, 100),
      amount: this.vs.validation('Required', 0, 100, 100),
      returnAmout: this.vs.validation('Disable', 0, 100, 100),
      rate: this.vs.validation('Required', 0, 100, 100),
      paymentMethod: this.vs.validation('Required', 0, 100, 100),
      documentNo: this.vs.validation('Required', 0, 100, 100),
      investmentDate: this.vs.validation('Required', 0, 100, 100),
      remarks: this.vs.validation('Required', 0, 100, 100),
    });
    this.allScheme();
    this.allTenure();
    this.allUser();
    this.allPaymentMethod();
  }

  allTenure() {
    this.masterService.getTenures().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.tenures = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allScheme() {
    this.masterService.getSchemes().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.schemes = response.result;

      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allUser() {
    this.masterService.getUsers().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.users = response.result;

      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  allPaymentMethod() {
    this.masterService.getPaymentMethods().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.paymentMethods = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  get errorControl() {
    return this.investmentForm.controls;
  }

  submit() {
    if (this.investmentForm.valid) {
      this.investmentData = {
        userId: this.investmentForm.value.userName.id,
        schemeId: this.investmentForm.value.scheme.id,
        tenureId: this.investmentForm.value.tenure.id,
        amount: this.investmentForm.value.amount,
        ratePer: this.investmentForm.value.rate,
        paymentMethodId: this.investmentForm.value.paymentMethod.id,
        paymentMethodDoc: this.investmentForm.value.documentNo,
        investmentDate: this.investmentForm.value.investmentDate,
        SchemeValue: this.investmentForm.value.scheme.value,
        TenureValue: this.investmentForm.value.tenure.value,
        Remarks: this.investmentForm.value.remarks,
      }
      this.invesmentService.setNewInvesment(this.investmentData).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['/invest']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.investmentForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }
}
