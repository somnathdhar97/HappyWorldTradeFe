import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';

@Injectable({
  providedIn: 'root'
})
export class InvesmentService {

  constructor(private http: HttpClient,private toastService: ToastService) { }
  getAllInvesments(): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/Investment/GetAllInvesments')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
  getInvesmentsByStatus(statusId:number): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/Investment/GetInvesmentsByCategory/'+statusId)
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
  getStatusWiseInvesmentCount(): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/Investment/GetInvestmentsCount')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
}