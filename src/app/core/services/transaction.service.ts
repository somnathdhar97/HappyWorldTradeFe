import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient, private toastService: ToastService) { }
  getTotalTransactionAmount():Observable<IapiResponce> {
    return this.http
        .get<IapiResponce>('v1/Transaction/GetTotalTransactionsAmount')
        .pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            }),
        );
}
}
