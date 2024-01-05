import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { Observable, catchError } from 'rxjs';
import { IapiResponce } from '../models/iapi-responce';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:5295/api/';

  constructor(private http: HttpClient, private toastService: ToastService) { }

  register(payload: RegisterModel) {
    return this.http.post<any>(this.baseUrl + 'Registration/register', payload)
  }

  login(payload: LoginModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Login/authenticate', payload)
  }

  getAllUsers() {
    return this.http.get<any>(this.baseUrl + 'User/GetAllUser')
  }

  getFullUserDetailsById(userid: number): Observable<IapiResponce> {
    return this.http
      .get<IapiResponce>('v1/User/GetUserDetails/'+userid)
      .pipe(
        catchError((error) => {
          throw this.toastService.showError(error.message);
        }),
      );
  }
}
