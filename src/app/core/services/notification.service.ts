import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient,private toastService: ToastService) { }
  getNotifications(): Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/Notification/GetAllNotifications')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
  }
}
