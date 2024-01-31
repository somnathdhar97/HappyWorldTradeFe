import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { INewClinet, INewUser } from '../../models/IClient';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  valCheck: string[] = ['remember'];
  newClientData: INewClinet;
  registerForm: FormGroup;
  accountType: any[] = [];
  constructor(private toastService: ToastService, public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.vs.validation('Required', 0, 100, 100),
      email: this.vs.validation('Email', 0, 100, 100),
      userName: this.vs.validation('Required', 0, 100, 100),
      mobileNo: this.vs.validation('Mobile', 10, 10, 100),
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),

      bankName: this.vs.validation('Required', 0, 100, 100),
      ifsc: this.vs.validation('Required', 0, 100, 100),
      branchName: this.vs.validation('Required', 0, 100, 100),
      acNumber: this.vs.validation('Required', 0, 100, 100),
      confirmAcNumber: this.vs.validation('Required', 0, 100, 100),
      acHolderName: this.vs.validation('Required', 0, 100, 100),
      acType: this.vs.validation('Required', 0, 100, 100),
      pan: this.vs.validation('Required', 0, 100, 100),
    });

    this.accountType = [
      { name: 'Current', value: 1 },
      { name: 'Savings', value: 2 },
    ];
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      this.newClientData = {
        personalDeatils: {
          name: this.registerForm.value.name,
          username: this.registerForm.value.userName,
          mobileNumber: this.registerForm.value.mobileNo,
          password: this.registerForm.value.confirmPassword,
          email: this.registerForm.value.email,
        },
        bankDeatils: {
          bankName: this.registerForm.value.bankName,
          ifscCode: this.registerForm.value.ifsc,
          branchName: this.registerForm.value.branchName,
          accountNumber: this.registerForm.value.acNumber.toString(),
          accountHolderName: this.registerForm.value.acHolderName,
          accountType: this.registerForm.value.acType.value,
          pan: this.registerForm.value.pan,
        }
      }
      this.authService.regisertNewClient(this.newClientData).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['login']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }

  checkUsernameAvailability(e: any) {
    if (e.target.value) {
      this.authService.checkUserName(e.target.value).subscribe(resp => {
        if (!resp.result) {
          this.toastService.showError(resp.message);
          this.registerForm.controls['userName'].reset();
        }
      })
    }
  }

  checkConfirPasswordMatchedOrNot(e: any) {
    if (e.target.value) {
      if (e.target.value !== this.registerForm.value.password) {
        this.toastService.showError('Password and Confirm Password are not same.');
        this.registerForm.controls['confirmPassword'].reset();
      }
    }
  }
}
