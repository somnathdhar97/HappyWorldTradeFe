import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { IInsertInvestment, IInvestmentReturn, IUpcomingReturn } from '../models/Iinvesment';

@Injectable({
    providedIn: 'root'
})
export class InvesmentService {

    constructor(private http: HttpClient, private toastService: ToastService) { }
    getAllInvesments(): Observable<IapiResponce> {
        return this.http
            .get<IapiResponce>('v1/Investment/GetAllInvesments')
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                }),
            );
    }
    getInvesmentsByStatus(statusId: number): Observable<IapiResponce> {
        return this.http
            .get<IapiResponce>('v1/Investment/GetInvesmentsByCategory/' + statusId)
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
    setNewInvesment(newInvestmentData: IInsertInvestment): Observable<IapiResponce> {
        return this.http
            .post<IapiResponce>('v1/Investment/NewInvestment', newInvestmentData)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                }),
            );
    }
    setReturnInvesment(returnInvestmentData: IInvestmentReturn): Observable<IapiResponce> {
        return this.http
            .post<IapiResponce>('v1/Investment/InvestmentReturn', returnInvestmentData)
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                }),
            );
    }
    getUpcomingReturn(): Observable<IapiResponce> {
        return this.http
            .get<IapiResponce>('v1/Investment/GetUpcomingInvesments')
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                }),
            );
    }
    getTodayReturn(): Observable<IapiResponce> {
        return this.http
            .get<IapiResponce>('v1/Investment/GetTodayInvesments')
            .pipe(
                catchError((error) => {
                    throw this.toastService.showError(error.message);
                }),
            );
    }
}
