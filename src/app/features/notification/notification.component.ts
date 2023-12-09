import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { INotification, INotificationStatus } from 'src/app/core/models/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: INotification[][];
  updateNotificationStatus: INotificationStatus;
  loading: boolean = true;
  constructor(
    private notificationService: NotificationService,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.allNotifications();
  }
  allNotifications() {
    this.loading = true;
    this.notificationService.getNotifications().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.notifications = response.result;
        this.loading = false;

      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  changeNotificationStatus(notificationId: number, status: number) {
    this.updateNotificationStatus = {
      id: notificationId,
      status: status
    }
    this.notificationService.updateUserStatus(this.updateNotificationStatus).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.toastService.showSuccess(response.message);
        this.allNotifications();
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deletNotification(notificationId : number){

  }
}
