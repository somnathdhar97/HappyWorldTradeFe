import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  valCheck: string[] = ['remember'];

  registerForm: FormGroup;
  constructor(public layoutService: LayoutService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    console.log(this.registerForm.value);
  }
}
