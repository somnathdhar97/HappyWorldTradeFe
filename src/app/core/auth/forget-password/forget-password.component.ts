import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { IForgetPassword } from '../../models/IClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  forgetPasswordData: IForgetPassword;

  constructor(private fb: FormBuilder,
    private vs: ValidationService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: this.vs.validation('Email', 0, 100, 100),
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),
    });
  }

  get errorControl() {
    return this.forgetPasswordForm.controls;
  }

  changePassword() {
    if (this.forgetPasswordForm.valid) {
      this.forgetPasswordData = {
        email: this.forgetPasswordForm.value.email,
        password: this.forgetPasswordForm.value.confirmPassword,
      }
      this.authService.forgetPassword(this.forgetPasswordData).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['login']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.forgetPasswordForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }

  checkEmailExisOrNot(e: any) {
    if (e.target.value) {
      this.authService.checkUserEmailExistOrNot(e.target.value).subscribe(resp => {
        if (!resp.result) {
          this.toastService.showError(resp.message);
          this.forgetPasswordForm.controls['email'].reset();
        }
      })
    }
  }

  checkConfirPasswordMatchedOrNot(e: any) {
    if (e.target.value) {
      if (e.target.value !== this.forgetPasswordForm.value.password) {
        this.toastService.showError('Password and Confirm Password are not same.');
        this.forgetPasswordForm.controls['confirmPassword'].reset();
      }
    }
  }

}
