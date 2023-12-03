import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,private toastService: ToastService) { }
  getClients(): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/User/GetClients')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
  getStatusWiseClients(): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/User/GetStatusWiseClients')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
}
