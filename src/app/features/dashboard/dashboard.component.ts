import { Component, OnInit } from '@angular/core';
import { IStatusWiseClient } from 'src/app/core/models/IClient';
import { IStatusWiseInvesment } from 'src/app/core/models/Iinvesment';
import { ClientService } from 'src/app/core/services/client.service';
import { InvesmentService } from 'src/app/core/services/invesment.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  invesmentsCouts:IStatusWiseInvesment;
  clientsCounts:IStatusWiseClient;
  constructor(
    private invesmentService: InvesmentService,private clientService: ClientService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.countUsers();
    this.countInvesments();
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
}
