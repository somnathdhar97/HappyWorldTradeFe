import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  profileUpdateForm: FormGroup;
  cities: any[] = [];

  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.profileUpdateForm = this.fb.group({
      password: this.vs.validation('Required', 0, 100, 100),
      investmentId: this.vs.validation('Required', 0, 100, 100),
    });

  }

  get errorControl() {
    return this.profileUpdateForm.controls;
  }

  updateProfile() {
    if (this.profileUpdateForm.valid) {
      console.log(this.profileUpdateForm.value);
      // this.apiService.register(this.profileUpdateForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     alert("Created successfully..!")
      //     this.profileUpdateForm.reset();
      //     this.router.navigate(['/dashboard'])
      //   } else {
      //     this.profileUpdateForm.reset();
      //     this.profileUpdateForm.markAllAsTouched();
      //   }
      // });
      // this.router.navigate(['/dashboard'])
    } else {
      this.profileUpdateForm.markAllAsTouched();
      alert("Please fill all the fields carefully..!");
    }
  }
}
