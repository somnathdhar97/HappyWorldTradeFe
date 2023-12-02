import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  valCheck: string[] = ['remember'];

  registerForm: FormGroup;
  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private router: Router) { }

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
    console.log(this.registerForm);
  }
}
