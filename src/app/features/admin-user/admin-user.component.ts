import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IAdmins } from 'src/app/core/models/IClient';
import { ClientService } from 'src/app/core/services/client.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent {
  loading: boolean = false;
  admins: IAdmins[];
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private clientService: ClientService,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.loading = true;
    this.clientService.getAdmins().subscribe((responce) => {
      if (responce.apiResponseStatus == 1) {
        this.admins = responce.result;
      } else {
        this.toastService.showError(responce.message);
      }
      this.loading = false;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
