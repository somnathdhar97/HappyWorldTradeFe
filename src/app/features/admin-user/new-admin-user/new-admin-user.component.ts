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
  cities: any[] = [];

  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router,private toastService: ToastService) { }

  ngOnInit(): void {
    this.adminRegistrationForm = this.fb.group({
      name: this.vs.validation('Required', 0, 100, 100),
      email: this.vs.validation('Email', 0, 100, 100),
      // role: this.vs.validation('Required', 0, 100, 100),
      userName: this.vs.validation('Required', 0, 100, 100),
      mobileNo: this.vs.validation('Required', 10, 10, 100),
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),
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
    return this.adminRegistrationForm.controls;
  }

  create() {
    if (this.adminRegistrationForm.valid) {
      // this.apiService.register(this.adminRegistrationForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     alert("Created successfully..!")
      //     this.adminRegistrationForm.reset();
      //     this.router.navigate(['/dashboard'])
      //   } else {
      //     this.adminRegistrationForm.reset();
      //     this.adminRegistrationForm.markAllAsTouched();
      //   }
      // });
      this.newAdminData ={
        name : this.adminRegistrationForm.value.name,
        username:this.adminRegistrationForm.value.userName,
        mobileNumber:this.adminRegistrationForm.value.mobileNo,
        password:this.adminRegistrationForm.value.confirmPassword,
        email:this.adminRegistrationForm.value.email,
      }
      this.authService.CraeteNewAdmin(this.newAdminData).subscribe((response)=>{
        if(response.apiResponseStatus==1){
          this.toastService.showSuccess(response.message);
        }else{
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.adminRegistrationForm.markAllAsTouched();
      alert("Please fill all the fields carefully..!");
    }
  }
}
