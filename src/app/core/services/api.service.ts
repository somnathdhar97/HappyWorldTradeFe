import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:5295/api/';

  constructor(private http: HttpClient) { }

  register(payload: RegisterModel) {
    return this.http.post<any>(this.baseUrl + 'Registration/register', payload)
  }

  login(payload: LoginModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Login/authenticate', payload)
  }

  getAllUsers() {
    return this.http.get<any>(this.baseUrl + 'User/GetAllUser')
  }
}
