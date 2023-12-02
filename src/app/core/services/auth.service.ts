import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // getDecodedAccessToken(): any {
  //   try {
  //     const token = this.getToken();
  //     return jwt_decode(token ? token : '');
  //   } catch (Error) {
  //     return null;
  //   }
  // }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
