import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { INewUser } from 'src/app/core/models/IClient';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-new-admin-user',
  templateUrl: './new-admin-user.component.html',
  styleUrls: ['./new-admin-user.component.scss']
})
export class NewAdminUserComponent {
  adminRegistrationForm: FormGroup;
  newAdminData: INewUser;

  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.adminRegistrationForm = this.fb.group({
      name: this.vs.validation('Required', 0, 100, 100),
      email: this.vs.validation('Email', 0, 100, 100),
      userName: this.vs.validation('Required', 0, 100, 100),
      mobileNo: this.vs.validation('Mobile', 10, 10, 100),
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),
    });
  }

  get errorControl() {
    return this.adminRegistrationForm.controls;
  }

  create() {
    if (this.adminRegistrationForm.valid) {
      this.newAdminData = {
        name: this.adminRegistrationForm.value.name,
        username: this.adminRegistrationForm.value.userName,
        mobileNumber: this.adminRegistrationForm.value.mobileNo,
        password: this.adminRegistrationForm.value.confirmPassword,
        email: this.adminRegistrationForm.value.email,
      }
      this.authService.CraeteNewAdmin(this.newAdminData).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['/admin-user']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.adminRegistrationForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }

  checkUsernameAvailability(e: any) {
    if (e.target.value) {
      this.authService.checkUserName(e.target.value).subscribe(resp => {
        if (!resp.result) {
          this.toastService.showError(resp.message);
          this.adminRegistrationForm.controls['userName'].reset();
        }
      })
    }
  }

  checkConfirPasswordMatchedOrNot(e: any) {
    if (e.target.value) {
      if (e.target.value !== this.adminRegistrationForm.value.password) {
        this.toastService.showError('Password and Confirm Password are not same.');
        this.adminRegistrationForm.controls['confirmPassword'].reset();
      }
    }
  }
}
