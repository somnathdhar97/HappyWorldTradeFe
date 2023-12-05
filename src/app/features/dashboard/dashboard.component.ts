import { Component, OnInit } from '@angular/core';
import { IStatusWiseClient } from 'src/app/core/models/IClient';
import { IStatusWiseInvesment } from 'src/app/core/models/Iinvesment';
import { INotification } from 'src/app/core/models/notification';
import { ClientService } from 'src/app/core/services/client.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  notifications:INotification [][];
  invesmentsCouts:IStatusWiseInvesment;
  clientsCounts:IStatusWiseClient;
  constructor(
    private invesmentService: InvesmentService,private clientService: ClientService,private notificationService: NotificationService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.countUsers();
    this.countInvesments();
    this.allActiveNotifications();
  }
  countUsers(){
    this.clientService.getStatusWiseClients().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.clientsCounts = response.result;
      }else{
        this.toastService.showError(response.message);
      }
    });
  }
  countInvesments(){
    this.invesmentService.getStatusWiseInvesmentCount().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.invesmentsCouts = response.result;
        console.log(this.invesmentsCouts);
        
      }else{
        this.toastService.showError(response.message);
      }
    });
  }
  allActiveNotifications(){
    this.notificationService.getActiveNotifications().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.notifications = response.result;
      }else{
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
}
