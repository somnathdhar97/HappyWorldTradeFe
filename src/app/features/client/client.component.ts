import { Component, OnInit } from '@angular/core';
import { IClient, IStatusWiseClient } from 'src/app/core/models/IClient';
import { ClientService } from 'src/app/core/services/client.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients:IClient [][];
  allTypesOfClients:IStatusWiseClient;
  loading: boolean = true;
  constructor(
    private clientService: ClientService,
    private toastService: ToastService
) {}
  ngOnInit(): void {
    this.getAllClient();
    this.getUserCountStatusWise();
  }
  getAllClient(){
    this.loading = true;
    this.clientService.getClients().subscribe((responce)=>{
      if(responce.apiResponseStatus==1){
        this.clients = responce.result;
      }else{
        this.toastService.showError(responce.message);
      }
      this.loading = false;
    });
  }
  getUserCountStatusWise(){
    this.clientService.getStatusWiseClients().subscribe((response)=>{
      if(response.apiResponseStatus==1){
        this.allTypesOfClients = response.result;
      }else{
        this.toastService.showError(response.message);
      }
    });
  }
}
