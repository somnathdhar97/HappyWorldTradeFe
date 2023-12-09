import { Component, OnInit } from '@angular/core';
import { IChangeStatus, IClient, IStatusWiseClient } from 'src/app/core/models/IClient';
import { ClientService } from 'src/app/core/services/client.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: IClient[][];
  allTypesOfClients: IStatusWiseClient;
  updateUserStatus: IChangeStatus;
  loading: boolean = true;
  constructor(
    private clientService: ClientService,
    private toastService: ToastService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getAllClient();
    this.getUserCountStatusWise();
  }
  getAllClient() {
    this.loading = true;
    this.clientService.getClients().subscribe((responce) => {
      if (responce.apiResponseStatus == 1) {
        this.clients = responce.result;
      } else {
        this.toastService.showError(responce.message);
      }
      this.loading = false;
    });
  }
  getUserCountStatusWise() {
    this.clientService.getStatusWiseClients().subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.allTypesOfClients = response.result;
      } else {
        this.toastService.showError(response.message);
      }
    });
  }
  changeUserStatus(userId: number, status: number) {
    this.updateUserStatus = {
      id: userId,
      status: status
    }
    this.clientService.updateUserStatus(this.updateUserStatus).subscribe((response) => {
      if (response.apiResponseStatus == 1) {
        this.toastService.showSuccess(response.message);
        this.getAllClient();
        this.getUserCountStatusWise();
      } else {
        this.toastService.showError(response.message);
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  newInvest(clientId: number) {
    // this.router.navigate(['invest', clientId]);
  }
}
