import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { INotification } from 'src/app/core/models/notification';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})
export class NewNotificationComponent {
  noticeForm: FormGroup;
  notificationModel: INotification;
  constructor(private toastService: ToastService,
    private notificationService: NotificationService,
    public layoutService: LayoutService,
    public fb: FormBuilder,
    private vs: ValidationService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      noticeHeading: this.vs.validation('Required', 0, 100, 100),
      noticeMessage: this.vs.validation('Required', 0, 100, 100),
      noticeType: this.vs.validation('Required', 0, 100, 100),
      effectiveFrom: this.vs.validation('Required', 0, 100, 100),
      effectiveTo: this.vs.validation('Required', 0, 100, 100),
    });
  }

  get errorControl() {
    return this.noticeForm.controls;
  }

  create() {
    if (this.noticeForm.valid) {
      console.log(this.noticeForm.value);
      this.notificationModel = {
        name: this.noticeForm.value.noticeHeading,
        message: this.noticeForm.value.noticeMessage,
        type: this.noticeForm.value.noticeType,
        validFrom: this.datePipe.transform(this.noticeForm.value.effectiveFrom, 'dd/MM/yyyy'),
        validTo: this.datePipe.transform(this.noticeForm.value.effectiveTo, 'dd/MM/yyyy')
      }
      this.notificationService.setNewNotification(this.notificationModel).subscribe((response) => {
        if (response.apiResponseStatus == 1) {
          this.toastService.showSuccess(response.message);
          this.router.navigate(['notification']);
        } else {
          this.toastService.showError(response.message);
        }
      });
    } else {
      this.noticeForm.markAllAsTouched();
      this.toastService.showError("Please fill all the fields carefully..!");
    }
  }
}
