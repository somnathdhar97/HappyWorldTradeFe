import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  returnPaymentForm: FormGroup;
  cities: any[] = [];

  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.returnPaymentForm = this.fb.group({
      userId: this.vs.validation('Required', 0, 100, 100),
      investmentId: this.vs.validation('Required', 0, 100, 100),
      schemeName: this.vs.validation('Required', 0, 100, 100),
      tenure: this.vs.validation('Required', 0, 100, 100),
      amount: this.vs.validation('Required', 0, 100, 100),
      returnAmout: this.vs.validation('Disable', 0, 100, 100),
      rate: this.vs.validation('Required', 0, 100, 100),
      investmentDate: this.vs.validation('Required', 0, 100, 100),
    });

    this.cities = [
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];

  }

  get errorControl() {
    return this.returnPaymentForm.controls;
  }

  returnPayment() {
    if (this.returnPaymentForm.valid) {
      console.log(this.returnPaymentForm.value);
      // this.apiService.register(this.returnPaymentForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     alert("Created successfully..!")
      //     this.returnPaymentForm.reset();
      //     this.router.navigate(['/dashboard'])
      //   } else {
      //     this.returnPaymentForm.reset();
      //     this.returnPaymentForm.markAllAsTouched();
      //   }
      // });
      // this.router.navigate(['/dashboard'])
    } else {
      this.returnPaymentForm.markAllAsTouched();
      alert("Please fill all the fields carefully..!");
    }
  }

}
