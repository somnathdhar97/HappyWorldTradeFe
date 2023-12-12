import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IStatusWiseClient } from 'src/app/core/models/IClient';
import { IPendingReturn, IStatusWiseInvesment, IUpcomingReturn } from 'src/app/core/models/Iinvesment';
import { INotification } from 'src/app/core/models/notification';
import { ITransactionAmount } from 'src/app/core/models/transaction';
import { ClientService } from 'src/app/core/services/client.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notifications: INotification[][];
  invesmentsCouts: IStatusWiseInvesment;
  clientsCounts: IStatusWiseClient;
  transactionAmount: ITransactionAmount;
  upcomingReturns: IUpcomingReturn[];
  pendingReturns: IPendingReturn[];

  @ViewChild('filter') filter!: ElementRef;
  constructor(
    private invesmentService: InvesmentService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private toastService: ToastService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.countUsers();
    this.countInvesments();
    this.allActiveNotifications();
    this.totalTransactionAmount();
  }
  countUsers() {
    this.clientService.getStatusWiseClients().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.clientsCounts = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  countInvesments() {
    this.invesmentService.getStatusWiseInvesmentCount().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.invesmentsCouts = response.result;
        console.log(this.invesmentsCouts);

      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  totalTransactionAmount() {
    this.transactionService.getTotalTransactionAmount().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.transactionAmount = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  allActiveNotifications() {
    this.notificationService.getActiveNotifications().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.notifications = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  getBackgroundColorClass(type: number): string {

    return type === 2 ? 'bg-blue-100' : 'bg-orange-100';
  }

  getIconClass(type: number): string {
    return type === 2 ? 'pi pi-exclamation-circle text-xl text-blue-500' : 'pi pi-exclamation-triangle text-xl text-orange-500';
  }

  returnPayment(investmentId: number) {
    this.router.navigate(['return', investmentId]);
  }

  onGlobalFilterUpcomingReturn(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onGlobalFilterPendingReturn(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearUpcomingReturn(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  clearPendingReturn(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
