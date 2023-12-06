import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { INewClient } from '../models/IClient';
import { ILogincredentials } from '../models/iauth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  userLogin(logingcredentials: ILogincredentials): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/Auth/login', logingcredentials).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }

  getDecodedAccessToken(): any {
    try {
      const token = this.getToken();
      return jwtDecode(token ? token : '');
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  regisertNewClient(newClitentDetails: INewClient): Observable<IapiResponce> {
    return this.http.post<IapiResponce>('v1/User/NewUser', newClitentDetails).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.message);
      })
    );
  }
}
