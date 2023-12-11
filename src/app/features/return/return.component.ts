import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { IInvestmentReturn } from 'src/app/core/models/Iinvesment';
import { IPaymentMethod } from 'src/app/core/models/master';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { MasterService } from 'src/app/core/services/master.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  returnPaymentForm: FormGroup;
  paymentMethods: IPaymentMethod[] = [];

  constructor(public layoutService: LayoutService,
    public fb: FormBuilder,
    private vs: ValidationService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private toastService: ToastService,
    private invesmentService: InvesmentService,
  ) {
  }

  ngOnInit(): void {
    this.returnPaymentForm = this.fb.group({
      paymentMethodId: this.vs.validation('Required', 0, 100, 100),
      documentNo: this.vs.validation('Required', 0, 100, 100),
      remarks: this.vs.validation('Not Required', 0, 500, 500),
      returnDate: this.vs.validation('Required', 0, 100, 100),
    });
    this.allPaymentMethod();
  }

  get errorControl() {
    return this.returnPaymentForm.controls;
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

  returnPayment() {
    if (this.returnPaymentForm.valid) {
      let returnPayload: IInvestmentReturn = {
        investmentId: +this.route.snapshot.paramMap.get('investmentId'),
        paymentMethodId: this.returnPaymentForm.value.paymentMethodId.id,
        paymentMethodDoc: this.returnPaymentForm.value.documentNo,
        remarks: this.returnPaymentForm.value.remarks,
        returnDate: this.returnPaymentForm.value.returnDate,
      };
      this.invesmentService.setReturnInvesment(returnPayload).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['invest']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.returnPaymentForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }

}
