import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  noticeForm: FormGroup;
  cities: any[] = [];

  constructor(public layoutService: LayoutService, public fb: FormBuilder, private vs: ValidationService, private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      noticeHeading: this.vs.validation('Required', 0, 100, 100),
      noticeMessage: this.vs.validation('Required', 0, 100, 100),
      effectiveForm: this.vs.validation('Required', 0, 100, 100),
      effectiveTo: this.vs.validation('Required', 0, 100, 100),
    });
  }

  get errorControl() {
    return this.noticeForm.controls;
  }

  create() {
    if (this.noticeForm.valid) {
      console.log(this.noticeForm.value);
      // this.apiService.register(this.noticeForm.value).subscribe(resp => {
      //   if (resp.apiStatus == 1) {
      //     alert("Created successfully..!")
      //     this.noticeForm.reset();
      //     this.router.navigate(['/dashboard'])
      //   } else {
      //     this.noticeForm.reset();
      //     this.noticeForm.markAllAsTouched();
      //   }
      // });
      // this.router.navigate(['/dashboard'])
    } else {
      this.noticeForm.markAllAsTouched();
      alert("Please fill all the fields carefully..!");
    }
  }
}
