import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, private toastService: ToastService) { }
  getSchemes(): Observable<IapiResponce> {
    return this.http
      .get<IapiResponce>('v1/Scheme/GetSehemes')
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        }),
      );
  }

  getTenures(): Observable<IapiResponce> {
    return this.http
      .get<IapiResponce>('v1/Tenure/GetTenures')
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        }),
      );
  }

  getUsers(): Observable<IapiResponce> {
    return this.http
      .get<IapiResponce>('v1/User/GetClients')
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        }),
      );
  }

  getPaymentMethods(): Observable<IapiResponce> {
    return this.http
      .get<IapiResponce>('v1/PaymentMethod/GetPaymentMethods')
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        }),
      );
  }

}
