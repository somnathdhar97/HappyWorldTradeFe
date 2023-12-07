import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { INewUser } from '../../models/IClient';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  valCheck: string[] = ['remember'];
  newClientData: INewUser;
  registerForm: FormGroup;
  constructor(private toastService: ToastService,public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.vs.validation('Required', 0, 100, 100),
      email: this.vs.validation('Email', 0, 100, 100),
      userName: this.vs.validation('Required', 0, 100, 100),
      mobileNo: this.vs.validation('Required', 10, 10, 100),
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      // this.apiService.register(this.registerForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     this.registerForm.reset();
      //     this.router.navigate(['/login'])
      //   } else {
      //     this.registerForm.reset();
      //     this.registerForm.markAllAsTouched();
      //   }
      // });
      this.newClientData ={
        name : this.registerForm.value.name,
        username:this.registerForm.value.userName,
        mobileNumber:this.registerForm.value.mobileNo,
        password:this.registerForm.value.confirmPassword,
        email:this.registerForm.value.email,
      }
      this.authService.regisertNewClient(this.newClientData).subscribe((response)=>{
        if(response.apiResponseStatus==1){
          this.toastService.showSuccess(response.message);
          this.router.navigate(['login']);
        }else{
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      alert("Please fill all the fields carefully..!");
    }
  }
}
