import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { IUserFullDetails } from 'src/app/core/models/iuser';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  profileUpdateForm: FormGroup;
  cities: any[] = [];
  userId: number;
  userDetails: IUserFullDetails;
  accountType: any[] = [];

  constructor(public layoutService: LayoutService,
    public fb: FormBuilder,
    private vs: ValidationService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.accountType = [
      { name: 'Current', value: 1 },
      { name: 'Savings', value: 2 },
    ];

    this.profileUpdateForm = this.fb.group({
      name: [],
      email: [],
      userName: [],
      mobileNo: [],
      password: this.vs.validation('Required', 0, 100, 100),
      confirmPassword: this.vs.validation('Required', 0, 100, 100),
      bankName: [],
      ifsc: [],
      branchName: [],
      acNumber: [],
      confirmAcNumber: [],
      acHolderName: [],
      acType: [],
      pan: [],
    });

    this.userId = +this.route.snapshot.paramMap.get('userid');
    this.apiService.getFullUserDetailsById(this.userId).subscribe(resp => {
      this.userDetails = resp[0];
      this.profileUpdateForm.patchValue({
        name: this.userDetails.name,
        email: this.userDetails.email,
        userName: this.userDetails.username,
        mobileNo: this.userDetails.mobileNumber,
        bankName: this.userDetails.bankName,
        ifsc: this.userDetails.ifscCode,
        branchName: this.userDetails.branchName,
        acNumber: this.userDetails.accountNumber?.trim(),
        acHolderName: this.userDetails.accountHolderName,
        acType: this.accType?.name,
        pan: this.userDetails.pan,
      })
    });
  }

  get errorControl() {
    return this.profileUpdateForm.controls;
  }

  get accType(): any {
    return this.accountType.find((elm: any) => {
      return elm.value == this.userDetails?.accountType;
    });
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

  checkConfirPasswordMatchedOrNot(e: any) {
    if (e.target.value) {
      if (e.target.value !== this.profileUpdateForm.value.password) {
        this.toastService.showError('Password and Confirm Password are not same.');
        this.profileUpdateForm.controls['confirmPassword'].reset();
      }
    }
  }
}
